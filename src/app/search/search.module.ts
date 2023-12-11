import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';

import {IonicModule} from '@ionic/angular';
import {SearchPageRoutingModule} from './search-routing.module';
import {SearchPage} from './search.page';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SearchPageRoutingModule,
    TranslateModule,
    SharedModule
  ],
  declarations: [SearchPage]
})
export class SearchPageModule {
}
