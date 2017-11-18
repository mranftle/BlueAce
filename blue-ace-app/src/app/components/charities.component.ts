import {Component, OnInit, ViewChild } from '@angular/core'
import { Router } from "@angular/router";
@Component({
  selector:'charities',
  templateUrl: '../templates/charities.component.html',
  styleUrls:['../stylesheets/charities.component.css'],
})

export class CharitiesComponent {

  constructor(private router: Router) {}
  goHome(){
    this.router.navigateByUrl('/main');
  }
}
