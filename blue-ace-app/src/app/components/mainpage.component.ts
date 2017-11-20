/**
 * Created by matthewRanftle1 on 11/16/17.
 */
import {Component, OnInit, ViewChild } from '@angular/core'
import { Router } from "@angular/router";
@Component({
  selector:'main',
  templateUrl: '../templates/mainpage.component.html',
  styleUrls:['../stylesheets/mainpage.component.css'],
})

export class MainPageComponent {

  constructor(private router:Router){}
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
