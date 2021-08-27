import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Register } from '../model/register';
import { InspectorregisterService } from '../services/inspectorregister.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  userUpdateForm = new FormGroup({
    cmntBox: new FormControl(''),
    permission: new FormControl(''),
    applicationType: new FormControl(''),
    userType: new FormControl('')
  });

  @Input()
  name: String = '';
  companyName: String = '';
  permission: String = '';
  registerId!: number;
  applicationType: String = '';
  role: String = '';
  email: string='';
  arr: any= [];


  dropdownList:any = [];
  selectedItems:any = [];
  //dropdownSettings:any = {};
  dropdownSettings!:IDropdownSettings;
  selected: any;

  applicationTypeData: String = '';
  submitted = false;
  userValue :String = '';
  isEnabled: boolean = true;


  register = new Register

  constructor(private formBuilder: FormBuilder,
              private inspectorService: InspectorregisterService,
              public dialog: MatDialog,
    ) { 

    }

  ngOnInit(): void {
    this.userUpdateForm = this.formBuilder.group({
      cmntBox: [''],
      permission: ['', Validators.required],
      applicationType: ['', Validators.required],
      userType: [''],
      });
      this.register.registerId= this.registerId;
      this.userValue = this.role;

      this.arr=this.applicationType.split(',');

      this.dropdownList = this.arr;

      this.dropdownSettings = {
        singleSelection: false,
        idField: 'id',
        textField: 'code',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 1,
        allowSearchFilter: true
      };
  }

  onItemSelect(item: any) {
    
  }
  onSelectAll(items: any) {
    
  }

  get f() {
    return this.userUpdateForm.controls;
  }

  onSubmit() {
    
    this.register.adminUserName=this.email;
    if(this.userUpdateForm.value.permission == "No") {
      this.userUpdateForm.controls["cmntBox"].setValidators(Validators.required);
      this.userUpdateForm.controls["cmntBox"].updateValueAndValidity();
    }
    else{
      this.userUpdateForm.controls["cmntBox"].clearValidators();
      this.userUpdateForm.controls["cmntBox"].updateValueAndValidity();    }

    this.submitted= true;

    if(this.userUpdateForm.invalid) {
      return;
    }


    for(let i of this.userUpdateForm.value.applicationType) {
      if(i != "") {
        this.applicationTypeData += i+",";
      }
    }
    this.applicationTypeData = this.applicationTypeData.replace(/,\s*$/, "");
    this.register.applicationType = this.applicationTypeData;
    this.applicationTypeData = "";

    this.register.role = this.userUpdateForm.value.userType;

    this.inspectorService.updateInspector(this.register).subscribe(
      (data) => {
        this.dialog.closeAll();
      },
      (error) => {
        console.log("error");
      }
    )

  }
}
