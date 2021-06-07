import { Component, OnInit } from '@angular/core';
import { ClasslevelService } from 'src/app/services/classlevel.service';
import { ToastrService } from 'ngx-toastr';
import { FeeModulesService } from 'src/app/services/FeeModules.service';
import { AttendanceService } from 'src/app/services/Attendance.service';
import { Attendance } from 'src/app/Models/Attendance';

@Component({
  selector: 'app-basic-TakeAttendance',
  templateUrl: './basic-TakeAttendance.component.html',
  styleUrls: ['./basic-TakeAttendance.component.css']
})
export class BasicTakeAttendanceComponent implements OnInit {
  public btnLoader: boolean; 
  classLevels:any;
  allClasses:any;
  selected=true;
  selectedLevel; 
  stuIdSelected;
  allStudentOfClass:any;
  attendance:Attendance[];
  showData:boolean; 
  storeIds:number;
  attendanceDate:Date;
  todaydate:any;
  minDate: Date;
  maxDate: Date;
 
  constructor(
    private _classLevel:ClasslevelService,
    private _attendance:AttendanceService,
    private toastr: ToastrService) { 
      this.minDate = new Date();
      this.maxDate = new Date();
      this.minDate.setDate(this.minDate.getDate());
      this.maxDate.setDate(this.maxDate.getDate());
    }

  ngOnInit() {
    this.todaydate = new Date();
   
  }
  LevelChange(event){ 
    let Ids=event.target.value;
    this._classLevel.getClass(Ids).subscribe((data)=>{ 
      this.allClasses=data; 
    })
  } 

  onOptionsSelected(event){
    this.selectedLevel=event.target.value; 
   } 

   onOptionsSelectedStudents(event){
    this.stuIdSelected=event.target.value;  
   } 
   getStuByClassSelect(){  
    this.btnLoader = true;  
     if(this.selectedLevel==undefined || this.stuIdSelected==undefined){
      this.toastr.warning("Select valid class", 
      "Ohh!");
      this.btnLoader = false;
      return;
     }
   
    this._attendance.getAttendance(this.selectedLevel,this.stuIdSelected,this.todaydate).subscribe((data:Attendance[])=>{ 
      this.attendance=data; 
      console.log(this.attendance);  
      if(this.attendance!=null){ 
        this.showData=true;
        this.btnLoader = false;
      }else{
        this.showData=false;
        this.btnLoader = false;
      }
    })
   }

   MarkAttendance(){ 
     this._attendance.MarkAttendance(this.attendance).subscribe((data:Attendance[])=>{ 
      this.toastr.success("Attendance Mark Succesfully", 
      "Updated Successfully");
     },error=>{ 
      this.toastr.success("Attendance Mark Succesfully", 
      "Updated Successfully");
     })
   }
 
}
