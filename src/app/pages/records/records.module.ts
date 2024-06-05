import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { RecordsPageRoutingModule } from './records-routing.module';
import { RecordsPage } from './records.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RecordsPageRoutingModule,
    SharedModule
  ],
  declarations: [RecordsPage]
})
export class RecordsPageModule {}
