import {Component, OnInit, ViewChild } from '@angular/core'
import { Router } from "@angular/router";
@Component({
  selector:'sports',
  templateUrl: '../templates/sportsgames.component.html',
  styleUrls:['../stylesheets/sportsgames.component.css'],
})

export class SportsGamesComponent {
  constructor(private router:Router){}
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

