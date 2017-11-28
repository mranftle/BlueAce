import {Component, OnInit, ViewChild} from '@angular/core'
import {Router} from '@angular/router';
import {BetService} from "../services/bet.service";
import {Bet} from "../entities/bet";
import {Friend} from "../entities/friend";
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
  userNames:Friend[];
  userId: number;
  bets: Bet[];
  charities: Charity[];
  selectedBet: number;
  selectedCharity: Charity;

  constructor(private router: Router,
              private betService: BetService,
              private charityService: CharityService,
              private authService: AuthService, private modalService: NgbModal) {
  }

  gotoProfile() {
    this.router.navigateByUrl('/main/profile');
  }

  gotoSports() {
    this.router.navigateByUrl('/main/sportsgame');
  }

  gotoFriends() {
    this.router.navigateByUrl('/main/friends');
  }

  gotoCharities() {
    this.router.navigateByUrl('/main/charities');
  }

  getCharityName(charityId: number) {
    let charity = this.charities.filter(c => c.id === charityId)[0];
    return charity.name;
  }

  declineBet(bet_id: number) {
    this.betService.declineBet(bet_id);
    window.location.reload();

  }

  changeSelectedCharity(charity: Charity) {
    this.selectedCharity = charity;
  }

  getCharities() {
    this.charityService.getCharities().then(
      (charities) => {
        this.charities = charities.map(function (obj) {
          let c = new Charity();
          c.id = obj.id;
          c.name = obj.name;
          return c
        });
      });
  }

  acceptBet() {
    this.betService.acceptBet(this.selectedBet, this.selectedCharity.id);
    window.location.reload();
  }

  getBets() {
    this.authService.
    
    IdFromJwt().then( (res) => {
      this.userId = res.id;
      return this.userId;
    }).then( (id) => {
      this.charityService.getCharities().then(
        (charities) => {
          this.charities = charities.map(function(obj) {
            let c = new Charity();
            c.id = obj.id;
            c.name= obj.name;
            return c
          });
          return this.charities;
        }).then(
        (charities) => {
          this.authService.getUsersByUserName().then(
            (users) => {
              this.userNames = users.map(function(obj) {
                var f = new Friend();
                f.id = obj.id;
                f.username = obj.username;
                f.email = obj.email;
                return f;
              });
              return this.userNames;
            }
          ).then(
            (response) => {
              this.betService.getBets().then(
                (bets) => {
                  this.bets = bets.map(function (obj) {
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
                    b.requester = obj.requester;
                    b.home_charity = obj.home_charity;
                    b.away_charity = obj.away_charity;
                    b.home_user = obj.home_user;
                    b.away_user = obj.away_user;
                    for(var i = 0; i< response.length; ++i) {
                      if(response[i].id === obj.home_user) {
                        b.home_user_name = response[i].username;
                      }
                      else if( response[i].id === obj.away_user) {
                        b.away_user_name = response[i].username;
                      }
                    }
                    for(var i = 0; i< charities.length; ++i) {
                      if(charities[i].id === obj.home_charity) {
                        b.home_charity_name = charities[i].name;
                      }
                      else if( charities[i].id === obj.away_charity) {
                        b.away_charity_name = charities[i].name;
                      }
                    }
                    return b;
                  });
                }
              );
            }
          );
        }
      );
    })
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
  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  ngOnInit() {
    this.getBets();
  }

  open(content, bet_id: number) {
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
      return `with: ${reason}`;
    }
  }
}
