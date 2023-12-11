import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {lastValueFrom, Observable} from 'rxjs';
import {SwiperOptions} from 'swiper/types';

import {IPexelsCollection, IPexelsCollectionData, IPexelsPhoto} from '../../models';
import {PexelsService} from '../../../core/services';

@Component({
  selector: 'app-featured-collection',
  templateUrl: './featured-collection.component.html',
  styleUrls: ['./featured-collection.component.scss'],
})
export class FeaturedCollectionComponent implements OnInit {
  // Inputs / Outputs
  @Input() featuredCollections: IPexelsCollection[] = [];
  @Output() cardSelected = new EventEmitter<IPexelsCollection>();

  // Properties
  swiperConfig: SwiperOptions = {
    slidesPerView: 2,
    breakpoints: {
      320: {
        slidesPerView: 2,
      },
      576: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      992: {
        slidesPerView: 4,
      },
      1200: {
        slidesPerView: 5,
      },
    },
  };

  constructor(
    private pexelsService: PexelsService
  ) {
  }

  async ngOnInit(): Promise<void> {
    await this.getCollectionData();
  }

  private async getCollectionData(): Promise<void> {
    if (this.featuredCollections.length > 0) {
      for (const collection of this.featuredCollections) {
        const collection$: Observable<IPexelsCollectionData> = this.pexelsService.getCollection(collection.id);
        await lastValueFrom(collection$)
          .then((value: IPexelsCollectionData): void => {
            if (value.media.length > 0) {
              const firstPhoto: IPexelsPhoto | undefined = value.media.find(
                (photo: IPexelsPhoto): boolean => photo.type === 'Photo'
              );

              if (firstPhoto) {
                collection.main_image = firstPhoto.src.landscape;
              }
            }
          });
      }
    }
  }

  public onSelectCard(collection: IPexelsCollection): void {
    this.cardSelected.emit(collection);
  }
}
