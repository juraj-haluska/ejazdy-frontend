import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {MainComponent} from './app/components/main/main.component';
import {PageNotFoundComponent} from './app/components/page-not-found/page-not-found.component';
import {LoginComponent} from './app/components/login/login.component';
import {HomeComponent} from './app/components/home/home.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'home', component: MainComponent, children: [
      {path: 'item1', component: HomeComponent},
      {path: 'item2', component: HomeComponent}
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
