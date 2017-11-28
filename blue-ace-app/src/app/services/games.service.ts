/**
 * Created by ericgoodman on 11/16/17.
 */

import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {SportsGame} from "../entities/SportsGame";

@Injectable()
export class GameService {
  private url = 'https://blueace.win:8000/games';

  // private url = 'http://localhost:8000/games';

  constructor(private http: Http) {
    //
  }

  getAllGames() {
    let currentUser = localStorage.getItem('currentUser');
    let headers = new Headers({ 'Authorization': currentUser,
      'Content-Type': 'application-json'});
    let options = new RequestOptions({headers:headers});
    return this.http.get(this.url, options)
      .toPromise()
      .then(response => response.json())
      .catch(error => console.error(error));
  }

  placeBet(game: SportsGame) {

  }

}
