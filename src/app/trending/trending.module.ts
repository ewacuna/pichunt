import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {TranslateModule} from '@ngx-translate/core';

import {TrendingPageRoutingModule} from './trending-routing.module';
import {TrendingPage} from './trending.page';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrendingPageRoutingModule,
    SharedModule,
    TranslateModule,
  ],
  declarations: [TrendingPage],
})
export class TrendingPageModule {}
