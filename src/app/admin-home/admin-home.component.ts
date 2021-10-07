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
  notAuthorizedArray: any = [];
  approvedArray: any = [];
  rejectedArray: any = [];
  permissionList: any = ['Not Authorized', 'Approved', 'Rejected'];
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

  changePermission(e: any) {
    this.notAuthorizedArray = [];
    this.approvedArray = [];
    this.rejectedArray = [];
    if(e.target.value == 'Not Authorized') {
      for(let a of this.inspectorArr) {
        if(a.permission == 'NOT_AUTHORIZED') {
          this.notAuthorizedArray.push(a);
        }
      }
      this.updateTable(this.notAuthorizedArray);
    }
    else if(e.target.value == 'Approved') {
      for(let b of this.inspectorArr) {
        if(b.permission == 'Yes') {
          this.approvedArray.push(b);
        }
      }
      this.updateTable(this.approvedArray);
    }
    else if(e.target.value == 'Rejected') {
      for(let c of this.inspectorArr) {
        if(c.permission == 'No') {
          this.rejectedArray.push(c);
        }
      }
      this.updateTable(this.rejectedArray);
    }
    else {
      this.updateTable(this.inspectorArr);
    }
  }

  updateTable(value: any) {
    this.admin_dataSource = new MatTableDataSource(value);
    this.admin_dataSource.paginator = this.adminPaginator;
    this.admin_dataSource.sort = this.adminSort;
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
