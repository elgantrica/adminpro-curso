import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NpagefoundComponent } from './shared/npagefound/npagefound.component';
import { RegisterComponent } from './login/register.component';
import { PagesComponent } from './pages/pages.component';
import { LoginGuardGuard } from './services/guards/login-guard.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: PagesComponent,
    canActivate: [ LoginGuardGuard],
    loadChildren: './pages/pages.module#PagesModule'
  },
  { path: '**', component: NpagefoundComponent },
  //{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes , { useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
