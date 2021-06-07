import { Component, OnInit } from '@angular/core';
import { QuickAdmission } from 'src/app/Models/QuickAdmission';
import { ClasslevelService } from 'src/app/services/classlevel.service';
import { Pagination,PaginatedResult } from 'src/app/Models/Pagination';
import { Session } from 'src/app/Models/Session';
import { DashboardService } from 'src/app/services/AdminServices/Dashboard.service';
 
@Component({
  selector: 'app-basic-stu-list',
  templateUrl: './basic-stu-list.component.html',
  styleUrls: ['./basic-stu-list.component.css']
})
export class BasicStuListComponent implements OnInit {
  users: QuickAdmission[]; 
  user: QuickAdmission;
  pagination: Pagination;
  userParams: any = {};
  currentPage:number=1;
  itemsPerPage:number=5;
  isLoading:boolean;
  selected=true;
  genderList = [{value: 'male', display: 'Males'}, {value: 'female', display: 'Females'}];
  constructor(private _user:ClasslevelService) {this.isLoading=true }

  ngOnInit() {
   this.loadUsers(); 
   this.userParams.AdmissionNo = 'undefined';
   this.userParams.OrderBy='undefined';
   this.userParams.Gender = 'undefined';
  }

  loadUsers() {
    this._user.getQuickAdmiStudent(parseInt(localStorage.getItem("sessionId")),this.currentPage,this.itemsPerPage, this.userParams)
    .subscribe((res: PaginatedResult<QuickAdmission[]>) => {
      this.users = res.result;
      this.pagination = res.pagination;
      this.isLoading=false; 
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

  resetFilters() {
    this.userParams.Gender == 'undefined'; 
    this.userParams.AdmissionNo = 'undefined';
   this.userParams.OrderBy='undefined';
    this.loadUsers();
  }

}
