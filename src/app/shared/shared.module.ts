import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {RouterLink} from '@angular/router';

/* Components */
import {
  ClockLoadingComponent,
  FeaturedCollectionComponent,
  GalleryViewComponent,
} from './components';

import {SwiperDirective} from './directives';

@NgModule({
  declarations: [
    GalleryViewComponent,
    ClockLoadingComponent,
    FeaturedCollectionComponent,
    SwiperDirective,
  ],
  imports: [CommonModule, NgOptimizedImage, IonicModule, RouterLink],
  exports: [
    GalleryViewComponent,
    ClockLoadingComponent,
    FeaturedCollectionComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
