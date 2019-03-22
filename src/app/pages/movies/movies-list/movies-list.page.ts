import { Component, OnInit, OnDestroy } from '@angular/core';
import { YtsService } from '../../../services/yts.service';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { UiServiceService } from 'src/app/services/ui-service.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.page.html',
  styleUrls: ['./movies-list.page.scss'],
})
export class MoviesListPage implements OnInit, OnDestroy {
  movies :Array<any>=[];
  loading;
  error;
  page = 1;
  pageSize = 20;
  onRetry: any;
  subscription: Subscription;
  placeholder: boolean;
  enableSearch:boolean;

  constructor(private YTS: YtsService, private route: Router, private UI:UiServiceService) { }

  ngOnInit() {
   this.showMovies();
  }


  ionChange(val:string) {
      console.log(val);
    }
  
  ionClear(){
    this.togleSearch()
  }  

  togleSearch(){
    this.enableSearch = !this.enableSearch;
  }

  showMovies(){
    this.loading = true;
    this.error = false;
   this.subscription = this.YTS.getMoviesList( this.page, this.pageSize).subscribe(
      res =>{
       this.movies = res['movies'];
       this.loading = false; 
       this.error = false;
      }, err => {
        this.loading = false;
        this.error = true;
        this.UI.presentAlert('Error', err)
      }
    );
  }

  loadingEvent(e){
    //this.loading = true;
    this.page++;
    this.placeholder = true;
   this.subscription = this.YTS.getMoviesList(this.page , this.pageSize).subscribe(
      res =>{
       for(const data of res['movies']){
         this.movies.push(data);
       }
       e.target.complete();
       this.error = false;
       this.placeholder = false;
      }, err => {
        this.loading = false;
        this.error = true;
        this.UI.presentAlert('Error', err)
        e.target.complete();
      }
    );

  }

  

  retry(){
    this.error = false;
    this.loading = true;
   this.subscription = this.YTS.getMoviesList(this.page , this.pageSize).subscribe(
      res =>{
       for(const data of res['movies']){
         this.movies.push(data);
       }
       this.error = false;
       this.loading = false;
      }, err => {
        this.error = true;
        this.loading = false;
        this.UI.presentAlert('Error', err)      
      }
    );
  }

  onNavigate(id,imdb_id){
    this.route.navigate([`/tabs/movies-list/${id}/${imdb_id}`])
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe()
  }
}
