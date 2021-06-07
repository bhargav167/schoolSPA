import { Component, OnInit } from '@angular/core';
import { StudentService } from 'src/app/services/StudentServices/Student.service';
import { QuickAdmission } from 'src/app/Models/QuickAdmission';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Attendance } from 'src/app/Models/Attendance';
import { EventSettingsModel, View, EventRenderedArgs } from '@syncfusion/ej2-angular-schedule';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-StuAttendance',
  templateUrl: './StuAttendance.component.html',
  styleUrls: ['./StuAttendance.component.css']
})
export class StuAttendanceComponent implements OnInit {
  stuDetails:QuickAdmission;
  userId:string; 
  attendance:Attendance[]; 
  public readonly: boolean = true; 
  public selectedDate: Date = new Date(2020, 5, 5);
  public currentView: View = 'Month';
  public dataManger: DataManager = new DataManager();
  public eventSettings: EventSettingsModel;
  showData:boolean;
  constructor(private _stuServices:StudentService,private _route:ActivatedRoute,private _toster:ToastrService) { }

  ngOnInit() {
    this.userId= localStorage.getItem('Id'); 
    this.getStudentDetails();
  
   }
   getStudentDetails() {
     this._stuServices.getStudentDetails(this.userId).subscribe((res:QuickAdmission)=>{
       this.stuDetails=res;  
       this.getstuAttendance(this.stuDetails.standers,this.stuDetails.classsection,this.stuDetails.rollNo);
     }, err => {
       this._toster.error("Error In Loading Student Details");
     })
   }

   //Display Attendance On Calender
getstuAttendance(Class:string,Section:string,userId:string){  
  this.dataManger = new DataManager({
   url: 'https://localhost:5001/api/Attendance/StuAttendance/'+ Class +'/'+Section+'/'+userId+'?StartDate=null&EndDate=null',
   adaptor: new WebApiAdaptor,
   crossDomain: true
});
this.eventSettings={ dataSource: this.dataManger };
this.showData=true;   
  }

  oneventRendered(args: EventRenderedArgs): void {
    let categoryColor: string = args.data.CategoryColor as string;
    if (!args.element || !categoryColor) {
      return;
    }
    if (this.currentView === 'Agenda') {
      (args.element.firstChild as HTMLElement).style.backgroundColor = categoryColor;
    } else {
      args.element.style.backgroundColor = categoryColor;
      args.element.style.height = '50px';
      args.element.style.textAlign = 'center';
      args.element.style.fontSize = 'bold';
    }
  }  

}
