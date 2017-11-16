/**
 * Created by matthewRanftle1 on 10/16/17.
 */

import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from "./components/login.component";
import {MainPageComponent} from "./components/mainpage.component";

const appRoutes: Routes = [

  { path: 'login', component:LoginComponent},
  { path: 'main', component: MainPageComponent},
  { path: '**', redirectTo: 'login' }
];

export const routing = RouterModule.forRoot(appRoutes);
