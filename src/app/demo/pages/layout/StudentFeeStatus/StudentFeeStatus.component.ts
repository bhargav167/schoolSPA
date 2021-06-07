import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FeeTerms } from 'src/app/Models/FeeTerms'; 
import { ActivatedRoute } from '@angular/router';
import { StudentService } from 'src/app/services/StudentServices/Student.service';
import { QuickAdmission } from 'src/app/Models/QuickAdmission';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-StudentFeeStatus',
  templateUrl: './StudentFeeStatus.component.html',
  styleUrls: ['./StudentFeeStatus.component.css']
})
export class StudentFeeStatusComponent implements OnInit {
  feeModule:FeeTerms;
  stuDetails:QuickAdmission;
  userId:string;
  Id:number;  
  stander:string;
  section:string;
  Term1Fee:number=0;
  Term2Fee:number=0;

  Term1FeePaidAmt:number=0;
  Term2FeePaidAmt:number=0;
  Term1FeeDueAmt:number=0;
  Term2FeeDueAmt:number=0; 

  constructor(private _feeModule: StudentService, private _route: ActivatedRoute, private _toster: ToastrService) { }
  ngOnInit() {
    this.userId = localStorage.getItem('Id');
    this.getStudentDetails();
  }
  
    getStudentDetails() {
      this._feeModule.getStudentDetails(this.userId).subscribe((res:QuickAdmission)=>{
        this.stuDetails=res;  
        this.Id=this.stuDetails.Id; 
        this.stander=this.stuDetails.standers;
        this.section=this.stuDetails.classsection;
        this.loadFeeStaus(this.Id,this.stander,this.section);
      }, err => {
        this._toster.error("Error In Loading Student Details");
      })
    } 

  loadFeeStaus(id: number,stander:string,section:string) {
    this._feeModule.getStudentFeeDetails(id,stander,section)
      .subscribe((res: FeeTerms) => {
        this.feeModule = res; 
        this.feeModule.feeParticular.forEach(element => {
          element.Term1 = element.Term1;
          element.Term12 = element.Term12;
          element.Term1DueAmt = element.Term1DueAmt;
          element.Term2DueAmt = element.Term2DueAmt;
          element.Term1Paid = element.Term1Paid;
          element.Term2Paid = element.Term2Paid;

          this.Term1Fee = this.Term1Fee + element.Term1;
          this.Term2Fee = this.Term2Fee + element.Term12;

          this.Term1FeePaidAmt += element.Term1DueAmt;
          this.Term2FeePaidAmt += element.Term2DueAmt

          this.Term1FeeDueAmt += element.Term1Paid;
          this.Term2FeeDueAmt += element.Term2Paid;

        });
      }, error => {
        console.log(error);
      });

  }
}
