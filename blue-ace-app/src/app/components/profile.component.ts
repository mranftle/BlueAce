import {Component, OnInit, ViewChild } from '@angular/core'
import { Router } from '@angular/router';

@Component({
  selector: 'profile',
  templateUrl: '../templates/profile.component.html',
  styleUrls: ['../stylesheets/profile.component.css'],
})

export class ProfileComponent {

  constructor(private router: Router){}
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

}
