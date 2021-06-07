import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentService } from 'src/app/services/StudentServices/Student.service';
import { QuickAdmission } from 'src/app/Models/QuickAdmission';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StudentFeeStatusComponent } from '../StudentFeeStatus/StudentFeeStatus.component';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
 
@Component({
  selector: 'app-StudentDashboard',
  templateUrl: './StudentDashboard.component.html',
  styleUrls: ['./StudentDashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
@ViewChild(StudentFeeStatusComponent,{ read: false, static: false }) studentFeeStatusComponent:StudentFeeStatusComponent;
imgURL: any;
stuDetails:QuickAdmission;
userId:string;  
Id:number;
stander:string;
section:string;
loadFee:boolean=false;
isActive:boolean=false;
isActiveProfile:boolean=true;
isActiveFee:boolean=false;
constructor(private _stuServices:StudentService,
  private http:HttpClient,private _toster:ToastrService) { }

  ngOnInit() {
    this.isActiveProfile = true;
    this.userId = localStorage.getItem('Id');
    this.getStudentDetails();
  }
  ProfileActive(){
    this.isActiveProfile=true;
    this.isActive=false;
  }
  LoadFeeDetails() {
    this.isActiveProfile=false;
    this.isActive=true;
    this.studentFeeStatusComponent.loadFeeStaus(this.Id,this.stander,this.section);
  }
  getStudentDetails() {
    this._stuServices.getStudentDetails(this.userId).subscribe((res:QuickAdmission)=>{
      this.stuDetails=res;  
      this.Id=this.stuDetails.Id;
      this.stander=this.stuDetails.standers;
      this.section=this.stuDetails.classsection;
      localStorage.setItem("stander",this.stander);
      localStorage.setItem("section",this.section);
     this.imgURL=localStorage.getItem("imgurl");
    }, err => {
      this._toster.error("Error in loading student details");
    })
  }
  
}
