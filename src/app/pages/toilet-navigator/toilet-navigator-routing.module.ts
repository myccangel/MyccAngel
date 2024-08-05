import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ToiletNavigatorPage } from './toilet-navigator.page';

const routes: Routes = [
  {
    path: '',
    component: ToiletNavigatorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ToiletNavigatorPageRoutingModule {}
