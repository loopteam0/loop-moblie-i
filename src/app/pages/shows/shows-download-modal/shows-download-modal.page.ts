import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-shows-download-modal',
  templateUrl: './shows-download-modal.page.html',
  styleUrls: ['./shows-download-modal.page.scss'],
})
export class ShowsDownloadModalPage implements OnInit {

  data;
  

  constructor(public modalController: ModalController) { }

  ngOnInit() {
  }

  closeSlf() {
    this.modalController.dismiss();
  }

  download(url) {
    console.log(url);
    window.open(url,'_system', 'location=yes');
  }

}
