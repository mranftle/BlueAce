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
  private url = 'http://localhost:8000/games';

  constructor(private http: Http) {
    //
  }

  /**
   * Get all s
   * @returns {Promise<T>}
   */
  getAllGames(): Promise<any> {
    return this.http.get(this.url)
      .toPromise()
      .then(response => {

        return response.json();
      })
      .catch(error => {
          console.log(error);
      });
  }

  placeBet(game: SportsGame) {

  }

}
