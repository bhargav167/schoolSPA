import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw'; 
import { Attendance } from '../Models/Attendance';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  monts:any; 
  dates:string; 
  caldates:string;
  baseURL=environment.apiUrl;

  constructor(private _http:HttpClient) { }
  
  public getAttendance(classes:string,sec:string,date:Date){ 
    this.monts = date.getMonth() + 1;
    var ff = parseInt(this.monts);
    this.dates = date.getDate() + '-' + ff + '-' + date.getFullYear();
     return this._http.get(this.baseURL + 'Attendance/' + classes + '/' + sec + '/' + this.dates);
  }
  public getstuAttendance(classes:string,sec:string,rollNo:string){  
   return this._http.get(this.baseURL+'Attendance/StuAttendance/'+classes+'/'+sec+'/'+rollNo);
 }
 
  public MarkAttendance(attendance:Attendance[]){   
    attendance.forEach(element => { 
      if (element.Status == 'Present') {
        element.markingDate = this.dates;
        element.StartTime = new Date();
        element.EndTime = new Date();
        element.Subject = element.Status;
        element.CategoryColor = '#18FF00';
      } if (element.Status == 'Absent') { 
        element.markingDate = this.dates; 
        element.StartTime = new Date();
        element.EndTime = new Date();
        element.Subject = element.Status;
        element.CategoryColor = '#EC1117';
      }
      if (element.Status == 'Halfday') {
        element.markingDate = this.dates;
        element.StartTime = new Date();
        element.EndTime = new Date();
        element.Subject = element.Status;
        element.CategoryColor = '#FFEF00';
      }
    });
    return this._http.post(this.baseURL+'Attendance/Mark',attendance);
  }
}
