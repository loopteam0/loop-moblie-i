import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ShowsDownloadModalPage } from './shows-download-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ShowsDownloadModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ShowsDownloadModalPage]
})
export class ShowsDownloadModalPageModule {}
