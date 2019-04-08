import { Injectable } from '@angular/core';
import { ModalController, AlertController, ToastController } from '@ionic/angular';
import { FileOpener } from '@ionic-native/file-opener/ngx';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {

  _downloadDir = ''

  constructor(public modalController: ModalController,
     private alertController:AlertController,
     public toastController: ToastController,
     private fileOpener: FileOpener
     ) { }

     // modal controller
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

  async presentToast(message:string, duration = 5000) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration
    });
    toast.present();
  }

  openFile(path:string){
    this.fileOpener.open(path, 'application/x-bittorrent').then(
     res => this.presentToast(res)
    ).catch(
     err => this.presentToast(err)
    )

  }
  
  checkAppAvailability(fileType:string, optionalType?:string){
    this.fileOpener.appIsInstalled(fileType || optionalType).catch(
      res => this.presentToast('A torrent client is available', res)
    ).catch(
      err => this.presentToast(err)
    )
  }



}
