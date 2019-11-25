import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PageNotFoundRoutingModule} from './page-not-found-routing.module';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {CoreModule} from '../../core/core.module';


@NgModule({
  declarations: [
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    PageNotFoundRoutingModule,
    CoreModule
  ]
})
export class PageNotFoundModule {
}
