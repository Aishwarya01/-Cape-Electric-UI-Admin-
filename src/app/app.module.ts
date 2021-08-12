import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserUpdateComponent } from './user-update/user-update.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MaterialModule } from './material/material.module';
import { MsalModule, MsalService, MSAL_INSTANCE } from '@azure/msal-angular';
import { IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';
import { AdminLoginPortalComponent } from './admin-login-portal/admin-login-portal.component';
import { environment } from 'src/environments/environment';

export function MSALInstanceFactory(): IPublicClientApplication{
  return new PublicClientApplication({
    auth: {
      clientId: environment.clientId,
      redirectUri: environment.redirectUri,
      authority: environment.authority
    }
  })
}


@NgModule({
  declarations: [
    AppComponent,
    AdminHomeComponent,
    UserUpdateComponent,
    AdminLoginPortalComponent,

  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MsalModule,
    MatMenuModule,
    NgxBootstrapIconsModule.pick(allIcons),
    NgMultiSelectDropDownModule.forRoot()
    ],
  providers: [
    {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    },
    MsalService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }