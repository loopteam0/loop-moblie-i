import { Component, OnInit, Input, ElementRef,OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';
import { PopcornService } from '../../../services/popcorn.service';
import { UiServiceService } from '../../../services/ui-service.service';
import { ShowsDownloadModalPage } from '../shows-download-modal/shows-download-modal.page';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shows-details',
  templateUrl: './shows-details.page.html',
  styleUrls: ['./shows-details.page.scss'],
})
export class ShowsDetailsPage implements OnInit, OnDestroy {
  details;
  loading;
  error;
  Id;
  Image;
  subscription: Subscription;
  // tslint:disable-next-line:no-input-rename
  @Input('gbImage')bgImage:HTMLElement;

  constructor(private route: ActivatedRoute,private ShowService: PopcornService,
              private UI: UiServiceService, private satnitizer:DomSanitizer
    ) { }

  ngOnInit() {
    this.route.paramMap.subscribe( (params: ParamMap) => {
      const imdb_id = params.get('imdb_id');
      // get imdb_id without tt
      this.Id = imdb_id.substr(2);
    });

    this.showDetails(this.Id);

  }

  showDetails(id) {
    this.loading = true;
    this.error = false;
    
    this.subscription = this.ShowService.getShowDetails(id).subscribe(
      res => {
        this.details = res;
        this.loading = false;
        this.error = false;
      }, err => {
        this.loading = false;
        this.error = true;

      }
    );
  }

  setBackground(url:string){
   return this.satnitizer.bypassSecurityTrustUrl(url);    
  }


  async showDownloadModal(data) {
    this.UI.modal(data, ShowsDownloadModalPage);
  }

  doRefresh(e) {
    e.target.complete();
    this.showDetails(this.Id);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe()
  }
}
