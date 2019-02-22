import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

  constructor(public modalController: ModalController ) { }

  async modal(data, component) {
    const modal = await this.modalController.create({
      component: component,
      componentProps: {data: data},

    });
    return await modal.present();
  }
}
