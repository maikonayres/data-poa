import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {TransportLinesComponent} from './pages/transport-lines/transport-lines.component';

const routes: Routes = [
  {
    path: '',
    component: TransportLinesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransportLinesRoutingModule {
}
