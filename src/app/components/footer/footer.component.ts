import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  constructor(private alertController: AlertController) { }

  ngOnInit() {}

  async showAlert() {
    const alert = await this.alertController.create({
      header: 'Notice',
      message: 'This feature will be available soon.',
      buttons: ['OK']
    });

    await alert.present();
  }
}
