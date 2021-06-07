import { Component, OnInit } from '@angular/core';
import { EmpRegister } from 'src/app/Models/EmpRegister';
import { Pagination, PaginatedResult } from 'src/app/Models/Pagination';
import { EmployeeService } from 'src/app/services/Employee.service'; 
import { Session } from 'src/app/Models/Session';
import { DashboardService } from 'src/app/services/AdminServices/Dashboard.service';

@Component({
  selector: 'app-basic-Emp-list',
  templateUrl: './basic-Emp-list.component.html',
  styleUrls: ['./basic-Emp-list.component.css']
})
export class BasicEmpListComponent implements OnInit {
  users: EmpRegister[];
  user: EmpRegister;
  pagination: Pagination;
  userParams: any = {};
  currentPage:number=1;
  itemsPerPage:number=5;
  isLoading:boolean;
  selected=true;
  genderList = [{value: 'male', display: 'Males'}, {value: 'female', display: 'Females'}];
  constructor(private _user:EmployeeService) {this.isLoading=true }

  ngOnInit() {
    this.userParams.AdmissionNo = 'undefined';
    this.userParams.OrderBy='undefined';
    this.userParams.Gender = 'undefined';
    this.loadUsers();
  }
  loadUsers() { 
    this._user.getEmpRegistration(parseInt(localStorage.getItem("sessionId")), this.currentPage, this.itemsPerPage, this.userParams)
      .subscribe((res: PaginatedResult<EmpRegister[]>) => {
        this.users = res.result;
        this.pagination = res.pagination;
        this.isLoading = false;
      }, error => {
        console.log(error);
      }); 
  }

  pageChanged(event: any): void {
    this.isLoading=true;
    this.currentPage = event.page;
    this.loadUsers();
    this.isLoading=false;
  }
}



