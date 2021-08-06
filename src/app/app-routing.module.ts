import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminLoginPortalComponent } from './admin-login-portal/admin-login-portal.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminRegisterComponent } from './admin-register/admin-register.component';

const routes: Routes = [
  {path: '', component:AdminLoginPortalComponent,  pathMatch: 'full'},
  {path: 'admin/register',component:AdminRegisterComponent},
  {path: 'admin/login',component:AdminLoginPortalComponent},
  {path: 'admin/home',component:AdminHomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
