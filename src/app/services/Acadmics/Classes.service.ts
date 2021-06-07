import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Class } from 'src/app/Models/Class'; 
import { SubjectGroup } from 'src/app/Models/SubjectGroup';

@Injectable({
  providedIn: 'root'
})
export class ClassesService {
  baseURL=environment.apiUrl;
  constructor(private _http:HttpClient) { } 

  PostClass(classes:Class){  
    return  this._http.post(this.baseURL+'ClassesMaster' + '/register',classes);
  }
  PostSubjectGroup(subGroup:SubjectGroup){
    return  this._http.post(this.baseURL+'ClassesMaster' + '/AddSubGroupr',subGroup);
  }
  getClasses(){
    return this._http.get(this.baseURL+'ClassesMaster');
  }
  getSubGroup(){
    return this._http.get(this.baseURL+'ClassesMaster/AllSubGroup');
  }
  getClassById(id){
    return  this._http.get(this.baseURL+'ClassesMaster' +'/'+ id);
  }
  updateClass(id: number, sec: Class) {
    return this._http.put(this.baseURL+'ClassesMaster' + '/' + id, sec);
  }
  DelClass(id: number) {
    return this._http.delete(this.baseURL+'ClassesMaster' +'/'+ id);
  }
  DelSubGrp(id: number) {
    return this._http.delete(this.baseURL+'ClassesMaster/DelSubGroupr' +'/'+ id);
  }

}
