/**
 * Created by matthewRanftle1 on 11/26/17.
 */
import {Injectable} from "@angular/core";
import {Http, RequestOptions, Headers} from "@angular/http";

@Injectable()
export class CharityService {
  private charityUrl = 'http://blueace.win:8000/charity/';
  // private charityUrl = 'http://localhost:8000/charity/';
   constructor(private http:Http) {}

   getCharities() {
     let currentUser = localStorage.getItem('currentUser');
     let headers = new Headers({ 'Authorization': currentUser,
       'Content-Type': 'application/json'});
     let options = new RequestOptions({headers:headers});
     return this.http.get(this.charityUrl, options)
       .toPromise()
       .then(response => response.json())
       .catch(this.handleError);
   }

  //more detailed error message to come, move to error file
  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
