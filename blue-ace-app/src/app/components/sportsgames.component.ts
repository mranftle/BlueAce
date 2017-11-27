import {Component, OnInit, ViewChild } from '@angular/core'
import { Router } from '@angular/router';
import {AuthService} from '../services/auth.service';
import {NgbModal, ModalDismissReasons} from "@ng-bootstrap/ng-bootstrap";
import {BetService} from "../services/bet.service";
import {SportsGame} from "../entities/SportsGame";
import {GameService} from "../services/games.service";
import {Friend} from "../entities/friend";
import {FriendService} from "../services/friend.service";
@Component({
  selector: 'sports',
  templateUrl: '../templates/sportsgames.component.html',
  styleUrls: ['../stylesheets/sportsgames.component.css'],
})

export class SportsGamesComponent implements OnInit {

  // Games
  sportsGames: SportsGame[];
  selectedGame: SportsGame;

  // Friends
  friends: Friend[];
  selectedFriend: Friend[];

  // Charities
  charities: String[];
  selectedCharity: String;

  ngOnInit() {
    this.getGames();
    this.getFriends();
  }

  constructor(private router: Router,
              private betService: BetService,
              private authService: AuthService,
              private modalService:NgbModal,
              private gameService: GameService,
              private friendService: FriendService){}

  //get friends list
  getFriends() {
    this.friendService.getFriends().then(
      (allFriends) => {
        console.log(allFriends);
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
        })
      }
    ).catch((error) => {
      console.log(error);
    });
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

  acceptBet(bet_id:number) {
    this.betService.acceptBet(bet_id);
  }

  open(content, game: SportsGame) {
    this.selectedGame = game;
    this.modalService.open(content);
  }



}

