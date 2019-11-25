import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import { ErrorsNotifyComponent } from './components/errors-notify/errors-notify.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    ErrorsNotifyComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ErrorsNotifyComponent
  ]
})
export class CoreModule {
}
