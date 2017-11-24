import {Component, OnInit, ViewChild } from '@angular/core'
import { Router } from '@angular/router';
import {AuthService} from '../services/auth.service';
import {NgbModal, ModalDismissReasons} from "@ng-bootstrap/ng-bootstrap";
import {BetService} from "../services/bet.service";
@Component({
  selector: 'sports',
  templateUrl: '../templates/sportsgames.component.html',
  styleUrls: ['../stylesheets/sportsgames.component.css'],
})

export class SportsGamesComponent {
  closeResult: string;

  constructor(private router: Router,
              private betService: BetService,
              private authService: AuthService,
              private modalService:NgbModal){}
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
    this.authService.logout()
    this.router.navigateByUrl('/login');
  }

  acceptBet(bet_id:number) {
    this.betService.acceptBet(bet_id);
  }
  
  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}

