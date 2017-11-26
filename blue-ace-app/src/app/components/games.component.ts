/**
 * Created by ericgoodman on 11/17/17.
 */

import {Component, NgModule, OnInit} from '@angular/core'
import { Router } from "@angular/router";
import {SportsGame} from "../entities/SportsGame";
import {GameService} from "../services/games.service"
import {setTimeout} from "timers";
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector:'main',
  templateUrl: '../templates/games.component.html',
  styleUrls:['../stylesheets/games.component.css'],
  providers: [GameService]
})

export class GamesComponent implements OnInit{
  // Games
  sportsGames: SportsGame[];
  selectedGame: SportsGame;

  // Friends
  friends: String[];
  selectedFriend: String;

  // Charities
  charities: String[];
  selectedCharity: String;

  constructor(private gameService: GameService, private modalService: NgbModal) {
    this.friends = ['Mike', 'Anthony', 'Paul'];
    this.charities = ['Kiva', 'Boys & Girls Club', 'Invisible Children'];
    this.selectedFriend = this.friends[0];
    this.selectedCharity = this.charities[0];
  }

  open(content, game: SportsGame) {
    this.selectedGame = game;
    this.modalService.open(content);
  }

  changeSelectedFriend(friend: String) {
    console.log(friend);
    this.selectedFriend = friend;
  }

  changeSelectedCharity(charity: String) {
    console.log(charity);
    this.selectedCharity = charity;
  }

  requestBet() {
    console.log('Request initiated');
    console.log(this.selectedCharity);
    console.log(this.selectedFriend);
  }

  games() {
    this.gameService.getAllGames().then(
      (response) => {
        this.sportsGames = response.map(function(item) {
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
    )
  }

  ngOnInit() {
    this.games();
  }
}
