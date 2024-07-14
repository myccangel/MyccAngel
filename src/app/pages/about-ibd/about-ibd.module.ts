import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AboutIbdPageRoutingModule } from './about-ibd-routing.module';

import { AboutIbdPage } from './about-ibd.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AboutIbdPageRoutingModule,
    SharedModule
  ],
  declarations: [AboutIbdPage]
})
export class AboutIbdPageModule {}
