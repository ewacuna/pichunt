import {Component, OnDestroy, OnInit, signal, ViewChild} from '@angular/core';
import {
  InfiniteScrollCustomEvent,
  IonContent,
  IonInfiniteScroll,
  IonModal,
  IonSearchbar,
} from '@ionic/angular';
import {FormControl, FormGroup} from '@angular/forms';
import {distinctUntilChanged} from 'rxjs';
import {Capacitor} from '@capacitor/core';
import {Keyboard} from '@capacitor/keyboard';

import {HelperService, SubscriptionsContainer} from '../shared/helpers';
import {
  IFeaturedCollection,
  IPexelsCollection,
  IPexelsError,
  IPexelsPhoto,
  IPexelsPhotoList,
  ISearchFilter,
} from '../shared/models';
import {PexelsService} from '../core/services';
import {HttpParams} from '@angular/common/http';

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
  @ViewChild(IonModal) modal: IonModal;

  // Properties
  public searchForm: FormGroup;
  private subs: SubscriptionsContainer = new SubscriptionsContainer();
  public photoList = signal<IPexelsPhoto[]>([]);
  private page = 1;
  public featuredCollection: IFeaturedCollection;
  private searchParams: HttpParams = new HttpParams();
  public currentFilters: ISearchFilter[] = [];

  // State
  public isLoading = signal<boolean>(false);
  public isSearching = signal<boolean>(false);

  constructor(
    private pexelsService: PexelsService,
    private helperService: HelperService
  ) {}

  ngOnInit(): void {
    this.searchForm = new FormGroup({
      search: new FormControl<string>('', {nonNullable: true}),
    });

    this.listeningSearch();
    this.getFeaturedCollections();
  }

  private listeningSearch(): void {
    this.subs.add = this.searchForm
      .get('search')!
      .valueChanges.pipe(distinctUntilChanged())
      .subscribe((value: string): void => {
        if (!value) {
          this.isSearching.set(false);
          this.page = 1;
          this.photoList.set([]);
          this.content.scrollToTop(500).then();
        }
      });
  }

  public onSubmit(): void {
    this.page = 1;
    this.photoList.set([]);
    this.content.scrollToTop(500).then();
    this.onSearch(this.searchForm.get('search')?.value || '');
  }

  private onSearch(query: string, initializeSearch?: boolean): void {
    if (query.length <= 0) {
      this.page = 1;
      this.photoList.set([]);
      this.infiniteScroll?.complete();
      this.isLoading.set(false);
      return;
    }

    this.isSearching.set(true);

    this.subs.add = this.pexelsService
      .searchQuery(query, this.page, this.searchParams)
      .subscribe({
        next: (value: IPexelsPhotoList): void => {
          this.photoList.update((photoList) => [
            ...photoList,
            ...(value.photos || []),
          ]);
          this.infiniteScroll?.complete();
          this.isLoading.set(false);

          if (Capacitor?.getPlatform() !== 'web') {
            Keyboard.hide().then();
          }

          if (initializeSearch) {
            this.content.scrollToTop(200);
          }
        },
        error: async (err: IPexelsError): Promise<void> => {
          this.infiniteScroll?.complete();
          this.isLoading.set(false);
          await this.helperService.showError(err?.code);
        },
      });
  }

  public onGalleryInfinite(event: InfiniteScrollCustomEvent): void {
    this.page = this.page + 1;
    this.isLoading.set(true);
    this.onSearch(this.searchForm.get('search')?.value || '');
  }

  private getFeaturedCollections(): void {
    this.subs.add = this.pexelsService.getFeaturedCollections().subscribe({
      next: (value: IFeaturedCollection): void => {
        this.featuredCollection = value;
      },
      error: async (err: IPexelsError): Promise<void> => {
        await this.helperService.showError(err?.code);
      },
    });
  }

  public onSelectCard(event: IPexelsCollection): void {
    this.page = this.page + 1;
    this.isLoading.set(true);
    this.searchForm.get('search')?.setValue(event.title);
    this.searchInput.setFocus().then();
    this.onSearch(this.searchForm.get('search')?.value || '');
  }

  public onFiltersApply(event: ISearchFilter[]): void {
    this.modal.dismiss().then();
    let params = new HttpParams();
    this.currentFilters = event;

    const paramMapping: Record<string, string> = {
      'orientation': 'orientation',
      'size': 'size',
    };

    event.forEach((filter: ISearchFilter): void => {
      const paramName: string = paramMapping[filter.type];
      if (paramName) {
        params = params.append(paramName, filter.value);
      }
    });

    this.searchParams = params;
    this.page = 1;
    this.photoList.set([]);
    this.onSearch(this.searchForm.get('search')?.value || '', true);
  }

  public onClearFilters(): void {
    this.modal.dismiss().then();
    this.searchParams = new HttpParams();
    this.currentFilters = [];
    this.page = 1;
    this.photoList.set([]);
    this.onSearch(this.searchForm.get('search')?.value || '', true);
  }

  ngOnDestroy(): void {
    this.subs.dispose();
  }
}
