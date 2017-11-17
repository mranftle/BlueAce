/**
 * Created by matthewRanftle1 on 10/16/17.
 */

import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './components/login.component';
import {MainPageComponent} from './components/mainpage.component';
import {SportsGamesComponent} from './components/sportsgames.component';
import {CharitiesComponent} from './components/charities.component';
import {FriendsComponent} from './components/friends.component';
import {ProfileComponent} from './components/profile.component';


const appRoutes: Routes = [

  { path: 'login', component: LoginComponent},
  { path: 'main', children: [
    {
      path: '',
      component: MainPageComponent
    },
    {
      path: 'sportsgame',
      component: SportsGamesComponent
    },
    {
      path: 'charities',
      component: CharitiesComponent
    },
    {
      path: 'friends',
      component: FriendsComponent
    },
    {
      path: 'profile',
      component: ProfileComponent
    }
  ]
  },
  { path: '**', redirectTo: 'login' },

];

export const routing = RouterModule.forRoot(appRoutes);
