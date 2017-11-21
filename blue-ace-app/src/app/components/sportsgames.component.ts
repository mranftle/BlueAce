import {Component, OnInit, ViewChild } from '@angular/core'
import { Router } from '@angular/router';
import {AuthService} from '../services/auth.service';
@Component({
  selector: 'sports',
  templateUrl: '../templates/sportsgames.component.html',
  styleUrls: ['../stylesheets/sportsgames.component.css'],
})

export class SportsGamesComponent {
  constructor(private router: Router, private authService: AuthService){}
  goHome(){
    this.router.navigateByUrl('/main');
  }
  gotoProfile(){
    this.router.navigateByUrl('/main/profile');
  }
  gotoSports(){
    this.router.navigateByUrl('/main/sportsgame');
  }
  gotoFriends(){
    this.router.navigateByUrl('/main/friends');
  }
  gotoCharities(){
    this.router.navigateByUrl('/main/charities');
  }
  logout(){
    this.authService.logout()
    this.router.navigateByUrl('/login');
  }
}

