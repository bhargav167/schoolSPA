import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  baseURL=environment.apiUrl;
   constructor(private _http:HttpClient) { }
  
  public getStudentDetails(id:string){  
     return this._http.get(this.baseURL+'StudentDashboard' + '/'  + id);
  }
  public getStudentFeeDetails(StudentId:number,stander:string,Section:string){  
    return this._http.get(this.baseURL +'StudentDashboard'+ '/FeeStatus'+ '/' + StudentId+"/"+stander+'/'+Section);
 }
}
