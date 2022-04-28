import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { CreateComponent } from './components/create/create.component';
import { TestComponent } from './components/test/test.component';
import { VigilanteGuard } from './vigilante.guard';
const routes: Routes = [
  {path: '', component: HomeComponent, canActivate:[VigilanteGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'home', component:HomeComponent, canActivate:[VigilanteGuard]},
  {path: 'search', component: CreateComponent, canActivate:[VigilanteGuard]},
  {path: 'test', component: TestComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
