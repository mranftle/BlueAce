import {Component, OnInit, ViewChild } from '@angular/core'
import { Router } from '@angular/router';
import {BetService} from "../services/bet.service";
import {Bet} from "../entities/bet";
import {AuthService} from "../services/auth.service";
import {NgbModal, ModalDismissReasons} from "@ng-bootstrap/ng-bootstrap";
import {CharityService} from "../services/charity.service";
import {Charity} from "../entities/charity";
@Component({
  selector: 'profile',
  templateUrl: '../templates/profile.component.html',
  styleUrls: ['../stylesheets/profile.component.css'],
})

export class ProfileComponent implements OnInit {
  closeResult: string;
  bets: Bet[];
  charities: Charity[];
  selectedBet: number;
  selectedCharity: Charity;
  constructor(private router: Router,
              private betService: BetService,
              private charityService: CharityService,
              private authService: AuthService, private modalService:NgbModal){}
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

  declineBet(bet_id:number) {
    this.betService.declineBet(bet_id);
    window.location.reload();

  }
  changeSelectedCharity(charity: Charity) {
    this.selectedCharity = charity;
  }

  getCharities() {
    this.charityService.getCharities().then(
      (charities) => {
        this.charities = charities.map(function(obj) {
          let c = new Charity();
          c.id = obj.id;
          c.name= obj.name;
          return c
        });
      });

  }
  acceptBet() {
    this.betService.acceptBet(this.selectedBet, this.selectedCharity.id);
    window.location.reload();


  }
  getBets() {
    this.betService.getBets().then(
      (bets) => {
        this.bets = bets.map(function(obj) {
          let b = new Bet();
          console.log(obj);
          b.id = obj.id;
          b.home_team_abb = obj.home_team_abb;
          b.away_team_abb = obj.away_team_abb;
          b.home_score = obj.home_score;
          b.away_score = obj.away_score;
          b.completed = obj.completed;
          b.bet_amount = obj.bet_amount;
          b.winner = obj.winner;
          b.started = obj.started;
          b.home_charity = obj.home_charity;
          b.away_charity = obj.away_charity;
          return b;
        });
      }
    );
  }
  // noPending(){
  //   let none = true;
  //   for(const b in this.bets)
  //     if(b === 0 || b.completed === 1){
  //       none = false;
  //     }
  //   }
  //   return none;
  // }
  logout(){
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
  ngOnInit() {
    this.getBets();
    this.getCharities();
  }
  open(content, bet_id:number) {
    this.selectedBet = bet_id;
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
