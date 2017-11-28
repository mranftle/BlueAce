/**
 * Created by matthewRanftle1 on 11/21/17.
 */

import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions} from "@angular/http";
import {Bet} from "../entities/bet";

@Injectable()
export class BetService {
  private betUrl = 'http://localhost:8000/bet/'

  constructor(private http:Http){}

  getBets() {
    let currentUser = localStorage.getItem('currentUser');
    let headers = new Headers({ 'Authorization': currentUser,
                                'Content-Type': 'application/json'});
    let options = new RequestOptions({headers:headers});
    return this.http.get(this.betUrl, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  saveBet(bet: Bet) {
    let currentUser = localStorage.getItem('currentUser');
    let body = JSON.stringify(bet);
    let headers = new Headers({ 'Authorization': currentUser,
                                'Content-Type': 'application/json'});
    let options = new RequestOptions({headers:headers});
    this.http.post(this.betUrl, body, options)
      .map(res => res.json())
      .catch((error:any) => 'Server error')
      .subscribe()
  }

  acceptBet(bet_id:number, charity:number) {
    let currentUser = localStorage.getItem('currentUser');
    let body = JSON.stringify({charity: charity});
    let headers = new Headers({ 'Authorization': currentUser,
                                'Content-Type': 'application/json'});
    let options = new RequestOptions({headers:headers});
    let url = this.betUrl+ bet_id + '/accept_bet/';
    this.http.post(url, body, options)
      .map(res => res.json())
      .catch((error:any) => 'Server error')
      .subscribe()
  }

  declineBet(bet_id: number) {
    let currentUser = localStorage.getItem('currentUser');
    let headers = new Headers({ 'Authorization': currentUser,
                                'Content-Type': 'application/json'});
    let options = new RequestOptions({headers:headers});
    let url = this.betUrl + bet_id + '/decline_bet/';
    this.http.post(url, null, options)
      .map(res => res.json())
      .catch((error:any) => 'Server error')
      .subscribe()
  }

  //more detailed error message to come, move to error file
  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
