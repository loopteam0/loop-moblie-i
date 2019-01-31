import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MoviesListPage } from './movies-list.page';
import {NgPipesModule} from 'ngx-pipes';

const routes: Routes = [
  {
    path: '',
    component: MoviesListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,NgPipesModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers:[
  ],
  declarations: [MoviesListPage]
})
export class MoviesListPageModule {}
