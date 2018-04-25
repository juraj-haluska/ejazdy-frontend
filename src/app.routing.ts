import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {HomeComponent} from './app/components/home/home.component';
import {PageNotFoundComponent} from './app/components/page-not-found/page-not-found.component';
import {LoginComponent} from './app/components/login/login.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'home', component: HomeComponent, children: [
      {path: 'item1', component: LoginComponent},
      {path: 'item2', component: LoginComponent}
    ]
  },
  {path: 'login', component: LoginComponent},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})

export class RoutingModule {
}
