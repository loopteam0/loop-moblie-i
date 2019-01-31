import { Component, OnInit } from '@angular/core';
import { YtsService } from '../../../services/yts.service';
import { ActivatedRoute } from '@angular/router';
import { ParamMap } from '@angular/router';
import { UiServiceService } from '../../../services/ui-service.service';
import { MovieDownloadModalPage } from '../movie-download-modal/movie-download-modal.page';
import { IonRouterOutlet } from '@ionic/angular';


@Component({
  selector: 'app-movies-details',
  templateUrl: './movies-details.page.html',
  styleUrls: ['./movies-details.page.scss'],
})
export class MoviesDetailsPage implements OnInit {
  details;
  loading;
  error;
  parms;
  Id;
  constructor(private route: ActivatedRoute,
    private YTS: YtsService,
     private UI: UiServiceService,
    private router : IonRouterOutlet
    
    ) { }

  ngOnInit() {
 // this the id of the movie form the route
 this.parms = this.route.paramMap.subscribe((params: ParamMap) => {
  const imdb_id = params.get('imdb_id');
  this.Id = imdb_id;
 });

 this.showDetails(this.Id);
  }

  showDetails(id) {
    this.loading = true;
    this.error = false;
    
    this.YTS.getMovieDetails(id).subscribe(
      res => {
        this.details = res['movie'];
        this.loading = false;
        this.error = false;
      }, err => {
        this.loading = false;
        this.error = true;
      }
    );
  }

  showDownloadModal(data) {
    this.UI.modal(data, MovieDownloadModalPage);
  }

  doRefresh(e) {
    e.target.complete();
    this.showDetails(this.Id);
  }

  back(){
    this.router.canGoBack()
  }

}
