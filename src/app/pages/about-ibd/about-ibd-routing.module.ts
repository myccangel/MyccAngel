import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutIbdPage } from './about-ibd.page';

const routes: Routes = [
  {
    path: '',
    component: AboutIbdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutIbdPageRoutingModule {}
