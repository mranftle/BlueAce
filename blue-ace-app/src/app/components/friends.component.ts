import {Component, OnInit, ViewChild } from '@angular/core'
import { Router } from "@angular/router";
import {FriendService} from "../services/friend.service";
import {FriendRequest} from "../entities/friendRequest";
import {Friend} from "../entities/friend";
@Component({
  selector: 'friends',
  templateUrl: '../templates/friends.component.html',
  styleUrls:['../stylesheets/friends.component.css'],
})

export class FriendsComponent implements OnInit{
  allUsers: Friend[];
  friends: Friend[];
  friendRequests: FriendRequest[];
  sentFriendRequests: FriendRequest[];
  constructor(private router: Router,
              private friendService: FriendService){}
  goHome(){
    this.router.navigateByUrl('/main');
  }

  getAllUsers() {
    this.friendService.getAllUsers().then(
      (allUsers) => {
        this.allUsers = allUsers.map(function(obj) {
          var u = new Friend();
          u.id = obj.id;
          u.username = obj.username;
          u.email = obj.email;
          return u;
        });
      }
    )
  }

  // add friend
  addFriend(user_id: number, message:string) {
    console.log(user_id);
    this.friendService.addFriend(user_id, 'hi');
  }

  deleteFriend() {

  }

  // accept or decline a friend request
  acceptOrDeclineFriendRequest(request_id: number, acceptOrDecline:string){
    this.friendService.acceptDeclineFriendRequest(request_id, acceptOrDecline);
  }


  //get friends list
  getFriends() {
    this.friendService.getFriends().then(
      (friends) => {
        this.friends = friends.map(function(obj) {
          var f = new Friend();
          f.id = obj.pk;
          f.username = obj.username;
          f.email = obj.email;
          return f;
        })
      }
    );

  }

  // get friend requests
  getRequests() {
    this.friendService.getFriendRequests().then(
      (friendRequests) => {
        this.friendRequests = friendRequests.map(function(obj) {
          var fr = new FriendRequest();
          fr.id = obj.id;
          fr.from_user =obj.from_user;
          fr.to_user = obj.to_user;
          fr.message = obj.message;
          return fr
        });
      }
    );
  }


  // get sent friend requests
  getSentRequests() {
    this.friendService.getSentFriendRequests().then(
      (sentFriendRequests) => {
        this.sentFriendRequests = sentFriendRequests.map(function(obj) {
          var fr = new FriendRequest()
          fr.id = obj.pk;
          fr.to_user = obj.to_user;
          fr.from_user =obj.from_user;
          fr.message = obj.message;
          return fr;
        });
      }
    );
  }

  // search all users by email
  getUsersByEmail() {
    //
  }
  trackByFn(index, item) {
    return item.id;
  }
  ngOnInit() {
    this.getFriends();
    this.getAllUsers();
    this.getRequests();
    this.getSentRequests();
  }

}
