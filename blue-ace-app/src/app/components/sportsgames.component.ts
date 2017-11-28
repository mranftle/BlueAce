import {Component, ElementRef, OnInit, ViewChild} from '@angular/core'
import { Router } from '@angular/router';
import {AuthService} from '../services/auth.service';
import {NgbModal, ModalDismissReasons} from "@ng-bootstrap/ng-bootstrap";
import {BetService} from "../services/bet.service";
import {SportsGame} from "../entities/SportsGame";
import {GameService} from "../services/games.service";
import {Friend} from "../entities/friend";
import {FriendService} from "../services/friend.service";
import {CharityService} from "../services/charity.service";
import {Charity} from "../entities/charity";
import {Bet} from "../entities/bet";
import * as moment from 'moment';

@Component({
  selector: 'sports',
  templateUrl: '../templates/sportsgames.component.html',
  styleUrls: ['../stylesheets/sportsgames.component.css'],
})

export class SportsGamesComponent implements OnInit {

  modalReference: any;

  // Selected team
  selectedTeam: string;

  // Games
  sportsGames: SportsGame[];
  selectedGame: SportsGame;

  // Friends
  friends: Friend[];
  selectedFriend: Friend;

  // Charities
  charities: Charity[];
  selectedCharity: Charity;

  // Bet amount
  betAmount: number;

  ngOnInit() {
    console.log(this.getNiceTime(new Date()));
    this.getGames();
    this.getFriends();
    this.getCharities();
  }

  constructor(private router: Router,
              private betService: BetService,
              private authService: AuthService,
              private modalService:NgbModal,
              private gameService: GameService,
              private friendService: FriendService,
              private charityService: CharityService){
  }

  //get friends list
  getFriends() {
    this.friendService.getFriends().then(
      (allFriends) => {
        this.friends = allFriends.map(function(obj) {
          let friend = new Friend();
          friend.id = obj.pk;
          friend.username = obj.username;
          friend.email = obj.email;
          return friend;
        })
      }
    );
  }

  getCharities() {
    this.charityService.getCharities().then(
      (charities) => {
        this.charities = charities.map(function(obj) {
          let charity = new Charity();
          charity.name = obj.name;
          charity.id = obj.id;
          charity.description = obj.description;
          charity.total_donated = obj.total_donated;
          charity.url = obj.url;
        });
      }
    )
  }

  getNiceTime(date: Date) {
    let a = moment(date).utcOffset(-1);
    return a.format("h:mm A");
  }

  changeSelectedFriend(friend: Friend) {
    console.log(friend);
    this.selectedFriend = friend;
  }

  changeSelectedCharity(charity: Charity) {
    this.selectedCharity = charity;
  }

  changeSelectedTeam(team: string) {
    this.selectedTeam = team;
  }

  changeBetAmount(amount: number) {
    this.betAmount = amount;
  }

  getGames() {
    this.gameService.getAllGames().then(
      (games) => {
        this.sportsGames = games.map(function(item) {
          let game = new SportsGame();
          game.gameId = item.id;
          game.homeTeam = item.home_team;
          game.awayTeam = item.away_team;
          game.starts = new Date(item.starts);
          game.awayTeamAbbreviation = item.away_team_abb;
          game.homeTeamAbbreviation = item.home_team_abb;
          game.stadium = item.stadium;
          return game;
        }).filter(game => game.starts.getTime() > Date.now());
      }
    ).catch((error) => {
      console.log(error);
    });
  }

  requestBet(content) {
    this.authService.getUserIdFromJwt().then(
      (response) => {
        let userId = response.id;
        let bet = new Bet();
        bet.home_team_abb = this.selectedGame.homeTeamAbbreviation;
        bet.away_team_abb = this.selectedGame.awayTeamAbbreviation;
        bet.completed = 0;
        bet.started = this.selectedGame.starts.getTime() / 1000;
        bet.bet_amount = Number(this.betAmount);
        if (bet.bet_amount <= 0) {
          alert('Bet amount must be greater than 0!');
        }
        bet.game = this.selectedGame.gameId;
        bet.winner = null;
        bet.home_score = 0;
        bet.away_score = 0;
        if (this.selectedTeam === 'home') {
          bet.home_user = userId;
          bet.home_charity = this.selectedCharity.id;
          bet.away_charity = null;
          bet.away_user = null;
        } else {
          bet.away_user = userId;
          bet.away_charity = this.selectedCharity.id;
          bet.home_charity = null;
          bet.home_user = null;
        }
        console.log(JSON.stringify({bet}));
        return bet;
      }
    ).then(
      (bet) => {
        if (bet.bet_amount > 0) {
          this.betService.saveBet(bet);
          this.modalReference.close();
        }
      }
    );
  }


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
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  open(content, game: SportsGame) {
    this.selectedGame = game;

    if (this.selectedFriend === null) {
      // Can't bet without friends!
      alert('Must make friends before placing bets!');
    } else {
      this.selectedFriend = this.friends[0];
    }

    if (this.charities === null) {
      console.error('No charities...');
    } else {
      this.selectedCharity = this.charities[0];
    }

    if (this.selectedFriend && this.selectedCharity) {
      this.modalReference = this.modalService.open(content);
    }

  }
}

