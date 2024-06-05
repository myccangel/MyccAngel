import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RecordsCardComponent } from 'src/app/components/records-card/records-card.component';


@NgModule({
  declarations: [RecordsCardComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports: [RecordsCardComponent]
})
export class SharedModule {}
