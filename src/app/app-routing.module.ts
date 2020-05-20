import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NpagefoundComponent } from './shared/npagefound/npagefound.component';
import { RegisterComponent } from './login/register.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: NpagefoundComponent },
  //{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes , { useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
