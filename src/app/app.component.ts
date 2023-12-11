import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {register} from 'swiper/element/bundle';

import {HelperService} from './shared/helpers';
import {StorageService} from './core/services';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private translate: TranslateService,
    private storageService: StorageService,
    private helperService: HelperService
  ) {
  }

  async ngOnInit(): Promise<void> {
    await this.setLanguage();
    await this.setTheme();
  }

  initializeDarkTheme(isDark: boolean): void {
    this.helperService.toggleDarkTheme(isDark);
  }

  private async setLanguage(): Promise<void> {
    await this.storageService.get('language')
      .then(async (value): Promise<void> => {
        this.translate.use(value ? value : 'en');
        await this.storageService.set('language', this.translate.currentLang);
      });
  }

  private async setTheme(): Promise<void> {
    await this.storageService.get('theme')
      .then(async (value): Promise<void> => {
        if (value) {
          this.initializeDarkTheme(value === 'dark');
        } else {
          // Custom user system theme
          const prefersDark: MediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
          this.initializeDarkTheme(prefersDark.matches);
          prefersDark.addEventListener(
            'change',
            (mediaQuery: MediaQueryListEvent) => this.initializeDarkTheme(mediaQuery.matches)
          );
        }
      });
  }
}
