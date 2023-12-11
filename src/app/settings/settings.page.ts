import {Component, OnDestroy, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {SelectCustomEvent, ToggleCustomEvent} from '@ionic/angular';
import {Subscription} from 'rxjs';

import {HelperService} from '../shared/helpers';
import {StorageService} from '../core/services';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit, OnDestroy {
  // Properties
  public currentLang = 'en';
  private subs: Subscription = new Subscription();

  // State
  public themeToggle = false;

  constructor(
    private storageService: StorageService,
    private titleService: Title,
    private translate: TranslateService,
    private helperService: HelperService
  ) {
  }

  async ngOnInit(): Promise<void> {
    this.titleService.setTitle('PicHunt | Settings');
    await this.setLanguage();
    await this.setTheme();

    this.subs.add(
      this.translate.onLangChange.subscribe((event: LangChangeEvent): void => {
        this.currentLang = event.lang;
      })
    );
  }

  public toggleChange($event: ToggleCustomEvent): void {
    this.helperService.toggleDarkTheme($event.detail.checked);
  }

  public async handleLanguageChange($event: SelectCustomEvent): Promise<void> {
    this.translate.use($event.detail.value);
    await this.storageService.set('language', $event.detail.value);
  }

  private async setLanguage(): Promise<void> {
    await this.storageService.get('language')
      .then(async (value): Promise<void> => {
        this.currentLang = value ? value : 'en';
      });
  }

  private async setTheme(): Promise<void> {
    await this.storageService.get('theme')
      .then(async (value): Promise<void> => {
        if (value) {
          this.themeToggle = value === 'dark';
        } else {
          // Custom user system theme
          const prefersDark: MediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
          this.themeToggle = prefersDark.matches;
        }
      });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
