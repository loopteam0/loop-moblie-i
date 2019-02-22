import { Component, OnInit } from '@angular/core';
import { MovieDbService } from '../services/movie-db.service';
import { UiServiceService } from '../services/ui-service.service';
import { SignupPage } from './signup/signup.page';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  loginForm;

  constructor (private movieDB: MovieDbService, private UI:UiServiceService,private navCtrl: NavController){}

  ngOnInit(){

  }
 
  onSubmit(e){
    console.log(e);
  }

  onSignUp(){
    this.UI.modal('login-page', SignupPage)
    
  }

  goHome(){
    this.navCtrl.navigateBack('/')
  }
}
