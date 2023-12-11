import {Component, OnInit, ViewChild} from '@angular/core';
import {InfiniteScrollCustomEvent, IonInfiniteScroll} from '@ionic/angular';
import {Title} from '@angular/platform-browser';

import {HelperService, SubscriptionsContainer} from '../shared/helpers';
import {IPexelsError, IPexelsPhoto, IPexelsPhotoList} from '../shared/models';
import {PexelsService} from '../core/services';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.page.html',
  styleUrls: ['./trending.page.scss'],
})
export class TrendingPage implements OnInit {
  // Children
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  // Properties
  private subs: SubscriptionsContainer = new SubscriptionsContainer();
  public curatedPhotos: IPexelsPhoto[] = [];
  private page = 1;

  // State
  public isLoading = false;

  constructor(
    private titleService: Title,
    private pexelsService: PexelsService,
    private helperService: HelperService
  ) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('PicHunt | Trending');
    this.getCuratedPhotos();
  }

  private getCuratedPhotos(): void {
    this.subs.add = this.pexelsService.getCuratedPhotos(this.page)
      .subscribe({
        next: (value: IPexelsPhotoList): void => {
          this.curatedPhotos = [...this.curatedPhotos, ...(value.photos || [])];
          this.infiniteScroll?.complete();
          this.isLoading = false;
        },
        error: async (err: IPexelsError): Promise<void> => {
          this.infiniteScroll?.complete();
          this.isLoading = false;
          await this.helperService.showError(err?.code);
        }
      });
  }

  public onGalleryInfinite(event: InfiniteScrollCustomEvent): void {
    this.page = this.page + 1;
    this.isLoading = true;
    this.getCuratedPhotos();
  }
}
