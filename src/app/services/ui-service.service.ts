import { Injectable } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

  constructor(public modalController: ModalController, private alertController:AlertController ) { }

  async modal(data, component) {
    const modal = await this.modalController.create({
      component: component,
      componentProps: {data: data},
    });
    return await modal.present();
  }

  async presentAlert(type:string, message:any) {
    const alert = await this.alertController.create({
      header: type,
      message: message,
      buttons: ['OK']
    });
  
    await alert.present();
  }
}
