import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {routing} from "./app.routing";
import {LoginComponent} from "./components/login.component";
import {MainPageComponent} from "./components/mainpage.component";
import {AuthService} from "./services/auth.service";
import {FriendService} from "./services/friend.service";
import {HttpModule} from "@angular/http";

import {CharitiesComponent} from './components/charities.component';
import {FriendsComponent} from './components/friends.component';
import {ProfileComponent} from './components/profile.component';
import {SportsGamesComponent} from './components/sportsgames.component';
import {AuthGuard} from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainPageComponent,
    CharitiesComponent,
    FriendsComponent,
    ProfileComponent,
    SportsGamesComponent
  ],
  imports: [
    routing,
    BrowserModule,
    HttpModule
  ],
  providers: [AuthService,
              FriendService,
              AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
