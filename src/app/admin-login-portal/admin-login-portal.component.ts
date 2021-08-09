import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';

@Component({
  selector: 'app-admin-login-portal',
  templateUrl: './admin-login-portal.component.html',
  styleUrls: ['./admin-login-portal.component.css'],
})
export class AdminLoginPortalComponent implements OnInit {
  constructor(private msalService: MsalService, private router: Router) {}

  ngOnInit(): void {}
  email: string = '';
  login() {
    this.msalService.loginPopup().subscribe((res: AuthenticationResult) => {
      if (res != null && res.account != null) {
        this.email = res.account.username;
        this.msalService.instance.setActiveAccount(res.account);
        this.router.navigate(['/admin/home']);
      }
    });
  }

  isUserLoggedIn(): boolean {
    return this.msalService.instance.getActiveAccount != null;
  }
}
