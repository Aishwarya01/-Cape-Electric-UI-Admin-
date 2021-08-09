import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MsalService } from '@azure/msal-angular';
import { AuthenticationResult } from '@azure/msal-browser';
import { AdminServiceService } from '../services/admin-service.service';
import { UserUpdateComponent } from '../user-update/user-update.component';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent implements OnInit {
  adminColumns: string[] = [
    'name',
    'companyName',
    'department',
    'designation',
    'applicationType',
    'address',
    'contactNumber',
    'permission',
    'action',
  ];
  admin_dataSource!: MatTableDataSource<any>;
  @ViewChild('adminPaginator', { static: true }) adminPaginator!: MatPaginator;
  @ViewChild('adminSort', { static: true }) adminSort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private adminService: AdminServiceService,
    private msalService: MsalService
  ) {}
  email: string = '';
  ngOnInit(): void {
    this.msalService.loginPopup().subscribe((res: AuthenticationResult) => {
      if (res != null && res.account != null) {
        this.msalService.instance.setActiveAccount(res.account);
        this.email = res.account.username;
        this.adminService.retrieveAllInspector().subscribe(
          (data) => {
            this.admin_dataSource = new MatTableDataSource(data);
            this.admin_dataSource.paginator = this.adminPaginator;
            this.admin_dataSource.sort = this.adminSort;
          },
          (error) => {
            console.log('error');
          }
        );
      }
    });
  }

  logout() {
    this.msalService.logoutRedirect();
  }

  proceed(name: any, companyName: any, registerId: any, permission: any) {
    const dialogRef = this.dialog.open(UserUpdateComponent, {
      width: '500px',
    });
    dialogRef.componentInstance.name = name;
    dialogRef.componentInstance.companyName = companyName;
    dialogRef.componentInstance.registerId = registerId;
    dialogRef.componentInstance.permission = permission;

    dialogRef.afterClosed().subscribe((result) => {});
  }
}
