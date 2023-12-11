import {NgModule} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';

import {ImageViewerPageRoutingModule} from './image-viewer-routing.module';
import {ImageViewerPage} from './image-viewer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImageViewerPageRoutingModule,
    TranslateModule,
    NgOptimizedImage
  ],
  declarations: [ImageViewerPage]
})
export class ImageViewerPageModule {
}
