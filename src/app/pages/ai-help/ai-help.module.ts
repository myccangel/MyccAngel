import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AiHelpPageRoutingModule } from './ai-help-routing.module';

import { AiHelpPage } from './ai-help.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AiHelpPageRoutingModule,
    SharedModule
  ],
  declarations: [AiHelpPage]
})
export class AiHelpPageModule {}
