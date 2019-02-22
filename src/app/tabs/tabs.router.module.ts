import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'movies-list',
        children: [
          {
            path: '',
            loadChildren: '../pages/movies/movies-list/movies-list.module#MoviesListPageModule'
          }
        ]
      },
      {
        path: 'movies-list/:imdb_id/:id',
        children: [
          {
            path: '',
            loadChildren: '../pages/movies/movies-details/movies-details.module#MoviesDetailsPageModule'
          }
        ]
      },
      {
        path: 'shows-list',
        children: [
          {
            path: '',
            loadChildren: '../pages/shows/shows-list/shows-list.module#ShowsListPageModule'
          }
        ]
      },
      {
        path: 'shows-list/:imdb_id',
        children: [
          {
            path: '',
            loadChildren: '../pages/shows/shows-details/shows-details.module#ShowsDetailsPageModule'
          }
        ]
      },
      {
        path: 'musics',
        children: [
          {
            path: '',
            loadChildren: '../pages/musics/musics/musics.module#MusicsPageModule'
          }
        ]
      },
      {
        path: 'anime',
        children: [
          {
            path: '',
            loadChildren: '../pages/anime/anime/anime.module#AnimePageModule'
          }
        ]
      },
      {
        path: 'spinner',
        children: [
          {
            path: '',
            loadChildren: '../pages/spinner/spinner.module#SpinnerPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: 'movies-list',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'tabs',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: '../home/home.module#HomePageModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
