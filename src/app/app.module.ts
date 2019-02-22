import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ShowsDownloadModalPage } from './pages/shows/shows-download-modal/shows-download-modal.page';
import { MovieDownloadModalPage } from './pages/movies/movie-download-modal/movie-download-modal.page';
import { SignupPage } from './home/signup/signup.page';


@NgModule({
  declarations: [AppComponent, ShowsDownloadModalPage,MovieDownloadModalPage,SignupPage],
  entryComponents: [ ShowsDownloadModalPage, MovieDownloadModalPage, SignupPage],
  imports: [BrowserModule,HttpClientModule,HttpModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

