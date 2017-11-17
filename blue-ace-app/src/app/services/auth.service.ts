/**
 * Created by matthewRanftle1 on 11/16/17.
 */
import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';



@Injectable()
export class AuthService {
  private userUrl = 'http://localhost:8000/api-token-auth/';
  private signUpUrl= 'http://localhost:8000/signup/'
  constructor(private http: Http) {}

  login(username: string, password: string) {
    let body = JSON.stringify({username: username, password: password});
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});
    return this.http.post(this.userUrl,body,options)
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        let user = response.json();
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          console.log(user);
          localStorage.setItem('currentUser', 'JWT '.concat(user.token));
        }
      });
  }

  signup(username: string, password: string) {
    let body = JSON.stringify({username: username, password: password});
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers});
    return this.http.post(this.signUpUrl,body,options)
      .map((response: Response) => {
          // login successful if there's a jwt token in the response
          console.log('created');
        }
      );
  }
  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

  getJwt() {
    return localStorage.getItem('currentUser');
  }
}
