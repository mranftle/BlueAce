/**
 * Created by matthewRanftle1 on 10/16/17.
 */

import {Component, OnInit, ViewChild } from '@angular/core'
import { Router } from "@angular/router";
import {AuthService} from "../services/auth.service";
@Component({
  selector:'login',
  templateUrl: '../templates/login.component.html',
  styleUrls:['../stylesheets/login.component.css'],
})

export class LoginComponent implements OnInit {

  @ViewChild('username') username: any;
  @ViewChild('password') password: any;
  @ViewChild('email') email: any;

  constructor(private router:Router,
              private authService: AuthService){}

  ngOnInit() {
    this.authService.logout()
  }

  signup() {
    let errMsg: string;
    this.authService.signup(this.username.nativeElement.value,
                            this.password.nativeElement.value,
                            this.email.nativeElement.value)
      .subscribe(
        data => {
          this.router.navigate((['/main']))
        },
        error => {
          console.log('Login Error');
        }
      );
  }

  login() {
    let errMsg: string;
    this.authService.login(this.username.nativeElement.value,
                           this.password.nativeElement.value,
                           this.email.nativeElement.value)
      .subscribe(
        data => {
          this.router.navigate((['/main']))
        },
        error => {
          console.log('Login Error');
        }
      );
  }
}
