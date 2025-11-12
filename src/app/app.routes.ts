import { Routes } from '@angular/router';
import {AuthenticationViewComponent} from './features/authentication/views/authentication-view/authentication-view.component';
const PrincipalViewComponent=()=> import('./features/principal/views/principal-view/principal-view.component').then(m=>m.PrincipalViewComponent);
const PageNotFoundComponent=()=>import('./features/principal/views/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent);
const LoginComponent=()=>import('./features/authentication/components/login/login.component').then(m=>m.LoginComponent);
const RegisterComponent=()=>import('./features/authentication/components/register/register.component').then(m=>m.RegisterComponent);

export const routes: Routes = [
  {
    path: 'authentication', component: AuthenticationViewComponent,
    children: [
      { path: 'login', loadComponent: LoginComponent },
      { path: 'register', loadComponent: RegisterComponent }
    ]
  },
  {path:'', redirectTo:'/authentication',pathMatch:'full'},
  {path:'principal', loadComponent:PrincipalViewComponent},
  {path:'**',loadComponent:PageNotFoundComponent}
];
