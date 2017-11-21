import {Component, OnInit, ViewChild } from '@angular/core'
import { Router } from '@angular/router';
<<<<<<< HEAD
import {AuthService} from "../services/auth.service";
=======
import {BetService} from "../services/bet.service";
import {Bet} from "../entities/bet";
>>>>>>> 85d6e76e138a88214955d8a52573addfaf589100

@Component({
  selector: 'profile',
  templateUrl: '../templates/profile.component.html',
  styleUrls: ['../stylesheets/profile.component.css'],
})

<<<<<<< HEAD
export class ProfileComponent {

  constructor(private router: Router, private authService: AuthService){}
=======
export class ProfileComponent implements OnInit {
  bets: Bet[];
  constructor(private router: Router,
              private betService: BetService){}
>>>>>>> 85d6e76e138a88214955d8a52573addfaf589100
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

  getBets() {
    this.betService.getBets().then(
      (bets) => {
        this.bets = bets.map(function(obj) {
          let b = new Bet();
          console.log(obj);
          b.home_team_abb = obj.home_team_abb;
          b.away_team_abb = obj.away_team_abb;
          b.home_score = obj.home_score;
          b.away_score = obj.away_score;
          b.completed = obj.completed;
          return b;
        });
      }
    );
    console.log(this.bets);
  }

  ngOnInit() {
    this.getBets();
  }
}
