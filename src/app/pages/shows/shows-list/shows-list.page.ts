import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopcornService } from '../../../services/popcorn.service';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-shows-list',
  templateUrl: './shows-list.page.html',
  styleUrls: ['./shows-list.page.scss'],
})
export class ShowsListPage implements OnInit {
  Shows: Array<any> = [];
  loading: boolean;
  error: boolean;
  page = 1;
  placeholer:boolean;
  constructor(private service: PopcornService ,private route: Router,private navCtrl: NavController) { }

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

  loadingEvent(e: { target: { complete: { (): void; (): void; }; }; }) {
    this.page++;
    this.placeholer = true;
    this.service.getShowsList(this.page).subscribe(
      res => {
        // tslint:disable-next-line:whitespace
        for(const data of res) {
          this.Shows.push(data);
        }
        e.target.complete();
        this.loading = false;
        this.error = false;
        this.placeholer = false;
      },
      err => {
        this.loading = false;
        this.error = true;
        this.placeholer = false;
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

  
  onNavigate(id: any) {
    this.navCtrl.navigateForward(`/tabs/shows-list/${id}`)
  }
}
