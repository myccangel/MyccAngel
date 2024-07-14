import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AiHelpPage } from './ai-help.page';

const routes: Routes = [
  {
    path: '',
    component: AiHelpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AiHelpPageRoutingModule {}
