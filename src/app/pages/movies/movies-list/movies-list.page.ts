import { Component, OnInit, OnDestroy } from '@angular/core';
import { YtsService } from '../../../services/yts.service';
import { Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.page.html',
  styleUrls: ['./movies-list.page.scss']
})
export class MoviesListPage implements OnInit, OnDestroy {
  movies: Array<any> = [];
  loading;
  error;
  page = 1;
  pageSize = 50;
  onRetry: any;
  subscription: Subscription;
  placeholder: boolean;
  enableSearch: boolean;
  loading_i: boolean;

  constructor(
    private YTS: YtsService,
    private route: Router,
    private UI: UiServiceService
  ) {}

  ngOnInit() {
    this.showMovies();
    this.loading_i = false;
  }

  ionChange(val: string) {
    if (val.trim().length === 0 || !val) {
      // do nothing
    } else if (val.length === 0) {
     this.showMovies();
    } else {
      this.search(val);
    }
  }

  ionClear() {
    this.togleSearch();
  }

  togleSearch() {
    this.enableSearch = !this.enableSearch;
  }

  showMovies() {
    this.loading = true;
    this.loading_i = true;
    this.error = false;
    this.subscription = this.YTS.getMoviesList(
      this.page,
      this.pageSize
    ).subscribe(
      res => {
        this.movies = res['movies'];
        this.loading = false;
        this.loading_i = false;
        this.error = false;
      },
      err => {
        this.loading = false;
        this.loading_i = false;
        this.error = true;
        this.UI.presentAlert('Error', err);
      }
    );
  }

  loadingEvent(e) {
    //this.loading = true;
    if (this.movies.length > 0) {
      this.page++;
      this.placeholder = true;
      this.subscription = this.YTS.getMoviesList(
        this.page,
        this.pageSize
      ).subscribe(
        res => {
          for (const data of res['movies']) {
            this.movies.push(data);
          }
          e.target.complete();
          this.error = false;
          this.placeholder = false;
        },
        err => {
          this.loading = false;
          this.error = true;
          this.UI.presentAlert('Error', err);
          e.target.complete();
        }
      );
    } else {
      // do something
    }
  }

  doRefresh(e) {
    this.page = 1;
  //  this.movies = [];
    this.showMovies();

    timer(2000).subscribe(e.target.complete());
  }

  retry() {
    this.error = false;
    this.loading = true;
    this.subscription = this.YTS.getMoviesList(
      this.page,
      this.pageSize
    ).subscribe(
      res => {
        for (const data of res['movies']) {
          this.movies.push(data);
        }
        this.error = false;
        this.loading = false;
      },
      err => {
        this.error = true;
        this.loading = false;
        this.UI.presentAlert('Error', err);
      }
    );
  }

  search(keyword: string) {
    this.loading_i = true;
    this.error = false;
    this.subscription = this.YTS.getMoviesByKeyword(keyword).pipe(
      tap( res => {
        this.movies = [];
        timer(500);
      })
    ).subscribe(
      res => {
        this.loading_i = false;
        this.movies = res['movies'];
        this.loading = false;
        this.error = false;
        console.log(res);
      },
      err => {
        this.loading_i = false;
        this.error = true;
        this.UI.presentAlert('Error', err);
      }
    );
  }

  onNavigate(id: any, imdb_id: any) {
    this.route.navigate([`/tabs/movies-list/${id}/${imdb_id}`]);
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
  }
}
