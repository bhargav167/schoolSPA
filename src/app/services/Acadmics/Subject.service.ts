import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'; 
import { Subject } from 'src/app/Models/Subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  baseURL=environment.apiUrl;
  constructor(private _http:HttpClient) { } 

  PostSubject(subs:Subject){ 
    return  this._http.post(this.baseURL+'SubjectMaster' + '/register',subs);
  }
  getSubject(){
    return this._http.get(this.baseURL+'SubjectMaster');
  }
  getSubjectById(id){
    return  this._http.get(this.baseURL+'SubjectMaster' +'/'+ id);
  }
  updateSubject(id: number, sec: Subject) {
    return this._http.put(this.baseURL+'SubjectMaster' + '/' + id, sec);
  }
  DelSubject(id: number) {
    return this._http.delete(this.baseURL+'SubjectMaster' +'/'+ id);
  }
}
