import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {routing} from "./app.routing";
import {LoginComponent} from "./components/login.component";
import {MainPageComponent} from "./components/mainpage.component";
import {AuthService} from "./services/auth.service";
import {FriendService} from "./services/friend.service";

import {CharitiesComponent} from './components/charities.component';
import {FriendsComponent} from './components/friends.component';
import {ProfileComponent} from './components/profile.component';
import {SportsGamesComponent} from './components/sportsgames.component';
import {AuthGuard} from './guards/auth.guard';
import {BetService} from "./services/bet.service";
import {GamesComponent} from "./components/games.component";
import {HttpModule} from "@angular/http";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CharityService} from "./services/charity.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainPageComponent,
    CharitiesComponent,
    FriendsComponent,
    ProfileComponent,
    SportsGamesComponent,
    GamesComponent
  ],
  imports: [
    routing,
    BrowserModule,
    HttpModule,
    NgbModule.forRoot()
  ],
  providers: [AuthService,
              FriendService,
              CharityService,
              BetService,
              AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
