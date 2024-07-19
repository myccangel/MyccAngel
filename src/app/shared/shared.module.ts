import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RecordsCardComponent } from 'src/app/components/records-card/records-card.component';
import { FooterComponent } from '../components/footer/footer.component';
import { SwiperCardComponent } from '../components/swiper-card/swiper-card.component';
import { HeaderComponent } from '../components/header/header.component';
import { ButtonsComponent } from '../components/buttons/buttons.component';
import { ErrorMessageComponent } from '../components/error-message/error-message.component';
import { CoverPictureComponent } from '../components/cover-picture/cover-picture.component';


@NgModule({
  declarations: [
    FooterComponent,
    RecordsCardComponent,
    SwiperCardComponent,
    HeaderComponent,
    ButtonsComponent,
    ErrorMessageComponent,
    CoverPictureComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,

  ],
  exports: [
    RecordsCardComponent,
    FooterComponent,
    SwiperCardComponent,
    HeaderComponent,
    ButtonsComponent,
    ErrorMessageComponent,
    CoverPictureComponent
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {}







