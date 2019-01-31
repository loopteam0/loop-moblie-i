import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopcornService } from '../../../services/popcorn.service';

@Component({
  selector: 'app-shows-list',
  templateUrl: './shows-list.page.html',
  styleUrls: ['./shows-list.page.scss'],
})
export class ShowsListPage implements OnInit {
  Shows: Array<any> = [];
  loading;
  error;
  page = 1;

  constructor(private service: PopcornService ,private route: Router) { }

  ngOnInit() {
    this.showShows();
  }

  showShows(){
    this.service.getShowsList(1).subscribe(
      res => {
        this.Shows = res;
        this.loading = false;
        this.error = false;
      },
      err => {
        this.loading = false;
        this.error = true;
      }
    )
  }

  loadingEvent(e) {
    this.page++;
    this.service.getShowsList(this.page).subscribe(
      res => {
        // tslint:disable-next-line:whitespace
        for(const data of res) {
          this.Shows.push(data);
        }
        e.target.complete();
        this.loading = false;
        this.error = false;
      },
      err => {
        this.loading = false;
        this.error = true;
        e.target.complete();
      }
    )
  }
   
  retry() {
    this.loading = true;
    this.error = false;
    this.service.getShowsList(this.page).subscribe(
      res => {
        for(const data of res) {
          this.Shows.push(data);
        }
        this.loading = false;
        this.error = false;
      },
      err => {
        this.loading = false;
        this.error = true;
      }
    )
  }

  onNavigate(id) {
    this.route.navigate([`/tabs/shows-list/${id}`])
  }
}
