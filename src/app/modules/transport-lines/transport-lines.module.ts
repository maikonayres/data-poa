import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TransportLinesRoutingModule} from './transport-lines-routing.module';
import {TransportLinesComponent} from './pages/transport-lines/transport-lines.component';
import {CoreModule} from '../../core/core.module';
import {TransportLinesFilterPipe} from './pipes/transport-lines-filter/transport-lines-filter.pipe';
import {TransportLinesFilterDisplayComponent} from './components/transport-lines-filter-display/transport-lines-filter-display.component';
import {AgmCoreModule} from '@agm/core';


@NgModule({
  declarations: [
    TransportLinesComponent,
    TransportLinesFilterPipe,
    TransportLinesFilterDisplayComponent
  ],
  imports: [
    CommonModule,
    TransportLinesRoutingModule,
    CoreModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCNQ3NsqTouGXniSc6L-UywrqnycD90v5A'
    })
  ]
})
export class TransportLinesModule {
}
