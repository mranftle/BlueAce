/**
 * Created by Matt Ranftle on 11/20/17
 */
import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions} from "@angular/http";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import {Friend} from "../entities/friend";




@Injectable()
export class FriendService {
  private usersUrl = 'https://blueace.win:8000/signup/';
  private friendsUrl = 'https://blueace.win:8000/friends/';
  private friendRequestsUrl = 'https://blueace.win:8000/friends/requests/';
  private sentFriendRequestUrl = 'https://blueace.win:8000/friends/sent_requests/';
  private acceptDeclineFriendRequestsUrl = 'https://blueace.win:8000/friendrequests/';
  // private usersUrl = 'http://localhost:8000/signup/';
  // private friendsUrl = 'http://localhost:8000/friends/';
  // private friendRequestsUrl = 'http://localhost:8000/friends/requests/';
  // private sentFriendRequestUrl = 'http://localhost:8000/friends/sent_requests/';
  // private acceptDeclineFriendRequestsUrl = 'http://localhost:8000/friendrequests/';
  constructor(private http: Http){}

  getAllUsers() {
    let currentUser = localStorage.getItem('currentUser');
    let headers = new Headers({ 'Authorization': currentUser,
                                'Content-Type': 'application-json'});
    let options = new RequestOptions({headers:headers});
    return this.http.get(this.usersUrl, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  // send a friend request
  addFriend(user_id:number, message: string) {
    let body = JSON.stringify({user_id:user_id,
                               message:message});
    let currentUser = localStorage.getItem('currentUser');
    let headers = new Headers({ 'Authorization': currentUser,
                                'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers:headers });
    console.log(body);
    this.http.post(this.friendsUrl,body,options) // ...using post request
      .map(res => res.json()) // ...and calling .json() on the response to return data
      .catch((error:any) => 'Server error') //...errors if
      .subscribe();
  }

  // get friend requests
  getFriendRequests() {
    let currentUser = localStorage.getItem('currentUser');
    let headers = new Headers({ 'Authorization': currentUser,
                                'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.get(this.friendRequestsUrl, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);

  }

  // get sent friend requests
  getSentFriendRequests() {
    let currentUser = localStorage.getItem('currentUser');
    let headers = new Headers({ 'Authorization': currentUser,
                                'Content-Type' : 'application/json'});
    let options = new RequestOptions({headers:headers});
    return this.http.get(this.sentFriendRequestUrl, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);

  }

  // get friends
  getFriends() {
    let currentUser = localStorage.getItem('currentUser');
    let headers = new Headers({ 'Authorization': currentUser,
      'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    return this.http.get(this.friendsUrl, options)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  // accept or decline a friend request
  acceptDeclineFriendRequest(request_id: number, acceptOrDecline:string) {
    let currentUser = localStorage.getItem('currentUser');
    // let body = JSON.stringify('');
    let headers = new Headers({ 'Authorization': currentUser,
                                'Content-Type': 'application/json'});
    let options = new RequestOptions({headers:headers});
    let url = this.acceptDeclineFriendRequestsUrl + request_id + '/' +acceptOrDecline +'/';
    return this.http.post(url, null, options)
      .map(res => res.json())
      .catch((error:any) => 'Error Accepting or Declining Friend Request')
      .subscribe();
  }

  //more detailed error message to come, move to error file
  private handleError(error: any) {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
