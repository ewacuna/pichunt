import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ImageViewerPage} from './image-viewer.page';

const routes: Routes = [
  {
    path: ':id',
    component: ImageViewerPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImageViewerPageRoutingModule {}
