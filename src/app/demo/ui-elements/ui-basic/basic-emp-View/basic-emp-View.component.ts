import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmpRegister } from 'src/app/Models/EmpRegister';
import { QuickAdmission } from 'src/app/Models/QuickAdmission';
import { ClasslevelService } from 'src/app/services/classlevel.service';
import { EmployeeService } from 'src/app/services/Employee.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-basic-emp-View',
  templateUrl: './basic-emp-View.component.html',
  styleUrls: ['./basic-emp-View.component.scss']
})
export class BasicEmpViewComponent implements OnInit {
  employee:EmpRegister; 
  imgURL: string='../../../../../assets/images/user/emp.png';
  constructor(private _route:ActivatedRoute,
    private _http:HttpClient,
    private _tost:ToastrService,
    private _emp:EmployeeService){ }

    ngOnInit() {  
      this._emp.getEmp(+this._route.snapshot.params['id']).subscribe((user: EmpRegister) => {
        this.employee= user; 
        console.log(this.employee);
        this.loadProfileImg();
      }, error => {
        this._tost.error('Error','Problem in loading Profile details.',error);
      })
    }
    loadProfileImg(){  
      this._http.get(environment.apiUrl + `UserProfile/EmpImg/${+this._route.snapshot.params['id']}`)
        .subscribe((data:any) => { 
          data != null ? this.imgURL = data.Imgurl : this.imgURL='../../../../../assets/images/user/emp.png'; 
        },error=>{
          this._tost.error('Error','Problem in loading Profile Images.',error);
        });
    }
}
