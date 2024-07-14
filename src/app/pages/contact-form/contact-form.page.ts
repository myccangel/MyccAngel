import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.page.html',
  styleUrls: ['./contact-form.page.scss'],
})
export class ContactFormPage implements OnInit {
  contact = {
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  };

  constructor(
    private firestore: AngularFirestore,
    private toastController: ToastController
  ) {}

  ngOnInit() {}

  async submitForm() {
    try {
      await this.firestore.collection('contacts').add(this.contact);
      this.presentToast('Message sent successfully!', 'success');
      this.contact = { firstName: '', lastName: '', email: '', message: '' };
    } catch (error) {
      this.presentToast('Error sending message. Please try again.', 'danger');
    }
  }

  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message,
      color,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }
}
