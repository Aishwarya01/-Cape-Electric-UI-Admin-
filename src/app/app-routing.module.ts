import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminLoginPortalComponent } from './admin-login-portal/admin-login-portal.component';
import { MaslGuard } from './masl.guard';

const routes: Routes = [
  {path: '', component:AdminLoginPortalComponent,  pathMatch: 'full'},
  {path: 'admin/login',component:AdminLoginPortalComponent},
  {path: 'admin/home',component:AdminHomeComponent, canActivate: [MaslGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
