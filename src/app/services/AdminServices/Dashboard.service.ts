import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  baseURL=environment.apiUrl;
constructor(private _http:HttpClient) { }

// Get Total Student Count
GetStudentCount(SessionId:string){
  let sessionIds=parseInt(SessionId);
  return this._http.get(this.baseURL+'DashBoardAdmin/AllStudentCount/'+sessionIds);
}
GetTodaypresentStu(){
  return this._http.get(this.baseURL+'DashBoardAdmin/TodayPresentStudent');
}
getActiveSession(){
  return this._http.get(this.baseURL+'Session/ActiveSession');
}
TodayAdmissionCountCount(){
  return this._http.get(this.baseURL+'DashBoardAdmin/TodayAdmissionCount');
}
getSession(){
  return this._http.get(this.baseURL+'Session');
}
ActivateSession(id:number){ 
  return  this._http.post(this.baseURL + 'DashBoardAdmin/Active'+'/'+id,{});
}

TotalTeacher(SessionId:string){
  let sessionIds=parseInt(SessionId);
  return this._http.get(this.baseURL+'DashBoardAdmin/TotalTeacher/'+sessionIds);
}
}
