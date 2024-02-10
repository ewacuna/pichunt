import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {Browser} from '@capacitor/browser';

import {HelperService, SubscriptionsContainer} from '../shared/helpers';
import {PexelsService} from '../core/services';
import {IPexelsError, IPexelsPhoto} from '../shared/models';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.page.html',
  styleUrls: ['./image-viewer.page.scss'],
})
export class ImageViewerPage implements OnInit, OnDestroy {
  // Properties
  private photoId: string;
  public photo: IPexelsPhoto;
  private subs: SubscriptionsContainer = new SubscriptionsContainer();

  // State
  isLoading = false;
  isDownload = false;

  constructor(
    private route: ActivatedRoute,
    private titleService: Title,
    private pexelsService: PexelsService,
    private helperService: HelperService
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('PicHunt | Image Details');
    this.photoId = this.route.snapshot.paramMap.get('id') || '';
    this.photoId && this.getImageInfo(this.photoId);

    this.subs.add = this.helperService.downloadPicture.subscribe(
      (value: boolean): void => {
        this.isDownload = value;
      }
    );
  }

  private getImageInfo(photoId: string): void {
    this.isLoading = true;

    this.subs.add = this.pexelsService.getPhotoById(photoId).subscribe({
      next: (res: IPexelsPhoto): void => {
        this.photo = res;
        if (this.photo.alt) {
          this.titleService.setTitle('PicHunt | ' + this.photo.alt);
        }
        this.isLoading = false;
      },
      error: async (err: IPexelsError): Promise<void> => {
        await this.helperService.showError(err?.code);
        this.isLoading = false;
      },
    });
  }

  public async viewPhotographer(url: string): Promise<void> {
    url && (await Browser.open({url}));
  }

  public onDownloadImage(url: string): void {
    url && this.helperService.downloadImage(url);
  }

  ngOnDestroy(): void {
    this.subs.dispose();
  }
}
