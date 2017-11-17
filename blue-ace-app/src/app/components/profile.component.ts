import {Component, OnInit, ViewChild } from '@angular/core'
import { Router } from '@angular/router';
@Component({
  selector: 'profile',
  templateUrl: '../templates/profile.component.html',
  styleUrls: ['../stylesheets/profile.component.css'],
})

export class ProfileComponent {

  constructor(private router: Router){}
}
