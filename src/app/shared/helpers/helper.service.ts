import {Injectable} from '@angular/core';
import {ToastController} from '@ionic/angular';
import {TranslateService} from '@ngx-translate/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Capacitor} from '@capacitor/core';
import {
  Directory,
  Filesystem,
  PermissionStatus,
  WriteFileResult,
} from '@capacitor/filesystem';
import {Subject} from 'rxjs';

import {StorageService} from '../../core/services';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  // Properties
  private downloadPictureSubject: Subject<boolean> = new Subject<boolean>();
  downloadPicture = this.downloadPictureSubject.asObservable();

  constructor(
    private toastController: ToastController,
    private translate: TranslateService,
    private httpClient: HttpClient,
    private storageService: StorageService
  ) {}

  public set setDownloadPictureValue(value: boolean) {
    this.downloadPictureSubject.next(value);
  }

  public async showError(message?: string, duration?: number): Promise<void> {
    message =
      message || this.translate.instant('notifications.something_wrong');
    const toast: HTMLIonToastElement = await this.toastController.create({
      message,
      duration: duration || 3000,
      color: 'danger',
    });
    await toast.present();
  }

  public async showSuccess(message: string, duration?: number): Promise<void> {
    const toast: HTMLIonToastElement = await this.toastController.create({
      message,
      duration: duration || 3000,
      color: 'success',
    });
    await toast.present();
  }

  public toggleDarkTheme(shouldAdd: boolean): void {
    document.body.classList.toggle('dark', shouldAdd);
    this.setTheme(shouldAdd).then();
  }

  private async setTheme(isDark: boolean): Promise<void> {
    await this.storageService.set('theme', isDark ? 'dark' : 'light');
  }

  public downloadImage(imageUrl: string): void {
    const headers: HttpHeaders = new HttpHeaders().set('skip', 'true');

    const urlParts: string[] = imageUrl.split('/');
    const urlLastPart: string = urlParts[urlParts.length - 1];

    this.setDownloadPictureValue = true;

    this.httpClient.get(imageUrl, {headers, responseType: 'blob'}).subscribe({
      next: async (blob: Blob): Promise<void> => {
        // Download on Android
        if (Capacitor?.getPlatform() === 'android') {
          // Check storage permissions
          let permission: PermissionStatus =
            await Filesystem.checkPermissions();

          if (permission.publicStorage !== 'granted') {
            permission = await Filesystem.requestPermissions();
            if (permission.publicStorage !== 'granted') {
              this.setDownloadPictureValue = false;
              return;
            }
          }

          await this.downloadFileMobile(blob, urlLastPart);
        } else if (Capacitor.getPlatform() === 'web') {
          // Download on web
          const url: string = window.URL.createObjectURL(blob);
          const a: HTMLAnchorElement = document.createElement('a');
          a.href = url;
          a.download = urlLastPart;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);

          this.setDownloadPictureValue = false;
        }
      },
      error: (): void => {
        this.setDownloadPictureValue = false;
      },
    });
  }

  /**
   * Downloads a file and saves it on the mobile device.
   *
   * @param data - The file data as a Blob.
   * @param fileName - The desired name for the saved file.
   */
  private async downloadFileMobile(
    data: Blob,
    fileName: string
  ): Promise<void> {
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(data);

    reader.onloadend = async (): Promise<void> => {
      const base64data = reader.result;
      try {
        const result: WriteFileResult = await Filesystem.writeFile({
          path: 'Download/' + fileName,
          data: <string>base64data,
          directory: Directory.ExternalStorage,
          recursive: true,
        });

        this.setDownloadPictureValue = false;
        await this.showSuccess(
          this.translate.instant('notifications.file_save_done')
        );
      } catch (e) {
        this.setDownloadPictureValue = false;
        await this.showError(
          this.translate.instant('notifications.error_save_file')
        );
      }
    };
  }
}
