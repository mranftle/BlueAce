import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
@Injectable()
export class EmailService {
  private emailUrl = 'https://blueace.win/email/';

  constructor(private http: Http){}
  sendEmail(address: string) {
    let body = JSON.stringify({address});
    let currentUser = localStorage.getItem('currentUser');
    let headers = new Headers({ 'Authorization': currentUser,
      'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers:headers });
    console.log(body);
    this.http.post(this.emailUrl,body,options) // ...using post request
      .map(res => res.json()) // ...and calling .json() on the response to return data
      .catch((error:any) => 'Server error') //...errors if
      .subscribe();
  }
  //more detailed error message to come, move to error file
  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}
