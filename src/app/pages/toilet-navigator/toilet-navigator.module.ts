import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ToiletNavigatorPageRoutingModule } from './toilet-navigator-routing.module';

import { ToiletNavigatorPage } from './toilet-navigator.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ToiletNavigatorPageRoutingModule
  ],
  declarations: [ToiletNavigatorPage]
})
export class ToiletNavigatorPageModule {}
