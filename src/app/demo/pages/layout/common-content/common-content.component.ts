import { Component, OnInit} from '@angular/core';
import { DashboardService } from 'src/app/services/AdminServices/Dashboard.service';
import { Session } from 'src/app/Models/Session';

@Component({
  selector: 'app-common-content',
  templateUrl: './common-content.component.html',
  styleUrls: ['./common-content.component.scss']
})
export class CommonContentComponent implements OnInit{
totalStudent:number;
totalTeacher:number;
totalTodayAdmission:number; 
totalpresentStu:number; 
SessionId:string;
 
constructor(private _dashServices:DashboardService) {  this.ActiveSession(); }
  ngOnInit() {
   
  }
 public ActiveSession() {
   if (localStorage.getItem("sessionId") == null) {
     this._dashServices.getActiveSession().subscribe((data: Session) => {
       this.SessionId = data.Id.toString(); 
       this.getTotalStudent(this.SessionId);
       this.getTotalTeacher(this.SessionId);
       this.TotalTodayAdmission();
       this.TotalpresentStu();
     })
   } else {
     this.getTotalStudent(localStorage.getItem("sessionId"));
     this.getTotalTeacher(localStorage.getItem("sessionId"));
     this.TotalTodayAdmission();
     this.TotalpresentStu();
     this.getTotalTeacher(this.SessionId);
   }
  }

  getTotalStudent(sessionId: string) {
    this._dashServices.GetStudentCount(sessionId).subscribe((data: number) => {
      this.totalStudent = data;
    })
  }
  getTotalTeacher(sessionId: string) {
    this._dashServices.TotalTeacher(sessionId).subscribe((data: number) => {
      this.totalTeacher = data;
    })
  }
  TotalTodayAdmission(){
    this._dashServices.TodayAdmissionCountCount().subscribe((data:number)=>{
      this.totalTodayAdmission=data;
    })
  }
  TotalpresentStu(){
    this._dashServices.GetTodaypresentStu().subscribe((data:number)=>{
      this.totalpresentStu=data; 
    })
  }
}
