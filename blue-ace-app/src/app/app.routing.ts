/**
 * Created by matthewRanftle1 on 10/16/17.
 */

import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from "./components/login.component";
import {MainPageComponent} from "./components/mainpage.component";
import {AuthGuard} from "./guards/auth.guard";

const appRoutes: Routes = [

  { path: 'login', component:LoginComponent},
  { path: 'main', component: MainPageComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: 'login' }
];

export const routing = RouterModule.forRoot(appRoutes);
