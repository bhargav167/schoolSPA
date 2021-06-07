import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Homework } from 'src/app/Models/Homework/Homework';

@Injectable({
  providedIn: 'root'
})
export class HomeWorkService { 
  baseURL=environment.apiUrl;
constructor(private _http:HttpClient) { }
PostHomework(homeWork: Homework) {
  return this._http.post(this.baseURL + 'Homework' + '/registerhomework', homeWork);
}
DeleteHomework(id: number) {
  return this._http.delete(this.baseURL + 'Homework/'+id ,{});
}
  public getSubjects(classes: string, sec: string) {
    return this._http.get(this.baseURL + 'Homework/AllSub/' + classes + '/' + sec);
  }
  public getHomeworkById(id: number) {
    return this._http.get(this.baseURL + 'Homework/HomeworkById/' + id);
  }
  public getAllhomework(classes: string, sec: string, subject: string) {
    return this._http.get(this.baseURL + 'Homework/AllHomework/' + classes + '/' + sec + '/' + subject);
  }
}