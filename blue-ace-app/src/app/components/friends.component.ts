import {Component, OnInit, ViewChild } from '@angular/core'
import { Router } from "@angular/router";
@Component({
  selector: 'friends',
  templateUrl: '../templates/friends.component.html',
  styleUrls:['../stylesheets/friends.component.css'],
})

export class FriendsComponent {

  constructor(private router: Router){}
  goHome(){
    this.router.navigateByUrl('/main');
  }
}
