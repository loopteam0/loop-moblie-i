import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OrderByPipe } from 'ngx-pipes';
import { UiServiceService } from 'src/app/services/ui-service.service';

@Component({
  selector: 'app-shows-download-modal',
  templateUrl: './shows-download-modal.page.html',
  styleUrls: ['./shows-download-modal.page.scss'],
  providers: [OrderByPipe]
})
export class ShowsDownloadModalPage implements OnInit {

  data: any;
  

  constructor(public modalController: ModalController,
    private orderBy: OrderByPipe,
     private UI: UiServiceService
    
     ) {}

  ngOnInit() {
    
  }

  closeSlf() {
    this.modalController.dismiss();
  }

  download(url) {
    this.UI.checkAppAvailability('bittorrent', 'Bittorrent');

    this.UI.openFile(url)
  }

}
