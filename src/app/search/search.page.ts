import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {InfiniteScrollCustomEvent, IonContent, IonInfiniteScroll, IonSearchbar} from '@ionic/angular';
import {FormControl, FormGroup} from '@angular/forms';
import {Title} from '@angular/platform-browser';
import {distinctUntilChanged} from 'rxjs';
import {Capacitor} from '@capacitor/core';
import {Keyboard} from '@capacitor/keyboard';

import {HelperService, SubscriptionsContainer} from '../shared/helpers';
import {
  IFeaturedCollection,
  IPexelsCollection,
  IPexelsError,
  IPexelsPhoto,
  IPexelsPhotoList
} from '../shared/models';
import {PexelsService} from '../core/services';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit, OnDestroy {
  // Children
  @ViewChild(IonContent) content: IonContent;
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild(IonSearchbar) searchInput: IonSearchbar;

  // Properties
  public searchForm: FormGroup;
  private subs: SubscriptionsContainer = new SubscriptionsContainer();
  public photoList: IPexelsPhoto[] = [];
  private page = 1;
  public featuredCollection: IFeaturedCollection;

  // State
  public isLoading = false;
  public isSearching = false;

  constructor(
    private titleService: Title,
    private pexelsService: PexelsService,
    private helperService: HelperService
  ) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('PicHunt | Search');
    this.searchForm = new FormGroup({
      search: new FormControl<string>('', {nonNullable: true}),
    });

    this.listeningSearch();
    this.getFeaturedCollections();
  }

  private listeningSearch(): void {
    this.subs.add = this.searchForm.get('search')!.valueChanges
      .pipe(
        distinctUntilChanged(),
      )
      .subscribe((value: string): void => {
        if (!value) {
          this.isSearching = false;
          this.page = 1;
          this.photoList = [];
          this.content.scrollToTop(500).then();
        }
      });
  }

  public onSubmit(): void {
    this.page = 1;
    this.photoList = [];
    this.content.scrollToTop(500).then();
    this.onSearch(this.searchForm.get('search')?.value || '');
  }

  private onSearch(query: string): void {
    if (query.length <= 0) {
      this.page = 1;
      this.photoList = [];
      this.infiniteScroll?.complete();
      this.isLoading = false;
      return;
    }

    this.isSearching = true;

    this.subs.add = this.pexelsService.searchQuery(query, this.page)
      .subscribe({
        next: (value: IPexelsPhotoList): void => {
          this.photoList = [...this.photoList, ...(value.photos || [])];
          this.infiniteScroll?.complete();
          this.isLoading = false;

          if (Capacitor?.getPlatform() !== 'web') {
            Keyboard.hide().then();
          }
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
    this.onSearch(this.searchForm.get('search')?.value || '');
  }

  private getFeaturedCollections(): void {
    this.subs.add = this.pexelsService.getFeaturedCollections()
      .subscribe({
        next: (value: IFeaturedCollection): void => {
          this.featuredCollection = value;
        },
        error: async (err: IPexelsError): Promise<void> => {
          await this.helperService.showError(err?.code);
        }
      });
  }

  public onSelectCard(event: IPexelsCollection): void {
    this.page = this.page + 1;
    this.isLoading = true;
    this.searchForm.get('search')?.setValue(event.title);
    this.searchInput.setFocus().then();
    this.onSearch(this.searchForm.get('search')?.value || '');
  }

  ngOnDestroy(): void {
    this.subs.dispose();
  }
}
