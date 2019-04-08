import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ShowsDetailsPage } from './shows-details.page';
import { SharedModule } from 'src/shared/shared.module';
import { ShowsDownloadModalPage } from '../shows-download-modal/shows-download-modal.page';
import { MovieDownloadModalPage } from '../../movies/movie-download-modal/movie-download-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ShowsDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [
    ShowsDetailsPage,
    ShowsDownloadModalPage,
    MovieDownloadModalPage
  ],
  entryComponents: [ShowsDownloadModalPage, MovieDownloadModalPage]
})
export class ShowsDetailsPageModule {}
