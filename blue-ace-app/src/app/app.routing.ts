/**
 * Created by matthewRanftle1 on 10/16/17.
 */

import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from "./components/login.component";
import {MainPageComponent} from "./components/mainpage.component";
import {GamesComponent} from "./components/games.component";

const appRoutes: Routes = [

  { path: 'login', component:LoginComponent},
  { path: 'main', component: MainPageComponent},
  { path: 'games', component: GamesComponent},
  { path: '**', redirectTo: 'login' }
];

export const routing = RouterModule.forRoot(appRoutes);
