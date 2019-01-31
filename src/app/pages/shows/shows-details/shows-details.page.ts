import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';
import { PopcornService } from '../../../services/popcorn.service';
import { UiServiceService } from '../../../services/ui-service.service';
import { ShowsDownloadModalPage } from '../shows-download-modal/shows-download-modal.page';

@Component({
  selector: 'app-shows-details',
  templateUrl: './shows-details.page.html',
  styleUrls: ['./shows-details.page.scss'],
})
export class ShowsDetailsPage implements OnInit {
  details;
  loading;
  error;
  Id;
  constructor(private route: ActivatedRoute,private ShowService: PopcornService,
              private UI: UiServiceService
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
    
    this.ShowService.getShowDetails(id).subscribe(
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

  async showDownloadModal(data) {
    this.UI.modal(data, ShowsDownloadModalPage);
  }

  doRefresh(e) {
    e.target.complete();
    this.showDetails(this.Id);
  }
}
