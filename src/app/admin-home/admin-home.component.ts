import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { MsalService } from '@azure/msal-angular';
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
  errorMessage: string= '';
  inspectorArr: any = [];
  admin_dataSource!: MatTableDataSource<any>;
  @ViewChild('adminPaginator', { static: true }) adminPaginator!: MatPaginator;
  @ViewChild('adminSort', { static: true }) adminSort!: MatSort;
  email: string = '';
  constructor(
    private dialog: MatDialog,
    private adminService: AdminServiceService,
    private msalService: MsalService,
    private router: ActivatedRoute
  ) {
    this.email = this.router.snapshot.paramMap.get('email') || '{}';
  }

  ngOnInit(): void {
    this.retrieveInspectorDetails();
  }

  private retrieveInspectorDetails() {
    this.adminService.retrieveAllInspector().subscribe(
      (data) => {
        this.inspectorArr = [];
        for(let arr of data) {
          if(arr.role == "Inspector" || arr.role == "INSPECTOR") {
            this.inspectorArr.push(arr);
          }
        }
        this.admin_dataSource = new MatTableDataSource(this.inspectorArr);
        this.admin_dataSource.paginator = this.adminPaginator;
        this.admin_dataSource.sort = this.adminSort;
      },
      (error) => {
        this.errorMessage = error.error.message;
      }
    );
  }

  logout() {
    this.msalService.logoutRedirect();
  }

  proceed(
    name: any,
    companyName: any,
    registerId: any,
    permission: any,
    applicationType: any,
    role: any
  ) {
    const dialogRef = this.dialog.open(UserUpdateComponent, {
      width: '500px',
    });
    dialogRef.componentInstance.email = this.email;
    dialogRef.componentInstance.name = name;
    dialogRef.componentInstance.companyName = companyName;
    dialogRef.componentInstance.registerId = registerId;
    dialogRef.componentInstance.permission = permission;
    dialogRef.componentInstance.applicationType = applicationType;
    dialogRef.componentInstance.role = role;

    dialogRef.afterClosed().subscribe((result) => {
      this.retrieveInspectorDetails();
    });
  }
}
