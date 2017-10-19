/**
 * Created by matthewRanftle1 on 10/16/17.
 */

import {Component, OnInit, ViewChild } from '@angular/core'
import { Router } from "@angular/router";
@Component({
  selector:'login',
  templateUrl: '../templates/login.component.html',
  styleUrls:['../stylesheets/login.component.css'],
})

export class LoginComponent {

  constructor(private router:Router){}
}
