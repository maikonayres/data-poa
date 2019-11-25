import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
    {
      path: '',
      loadChildren: () => import('./modules/home/home.module').then(mod => mod.HomeModule),
    },
    {
      path: 'transport-lines',
      loadChildren: () => import('./modules/transport-lines/transport-lines.module').then(mod => mod.TransportLinesModule),
    },
    {
      path: 'not-found',
      loadChildren: () => import('./modules/page-not-found/page-not-found.module').then(mod => mod.PageNotFoundModule),
    },
    {
      path: '**',
      redirectTo: 'not-found'
    }
  ]
;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
