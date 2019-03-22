import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OrderByPipe } from 'ngx-pipes';

@Component({
  selector: 'app-shows-download-modal',
  templateUrl: './shows-download-modal.page.html',
  styleUrls: ['./shows-download-modal.page.scss'],
  providers: [OrderByPipe]
})
export class ShowsDownloadModalPage implements OnInit {

  data: any;
  

  constructor(public modalController: ModalController,private orderBy: OrderByPipe) { 
  }

  ngOnInit() {
    
  }

  closeSlf() {
    this.modalController.dismiss();
  }

  download(url) {
    
  }

}
