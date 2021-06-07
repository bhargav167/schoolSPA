import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Session } from 'src/app/Models/Session';
import { environment } from 'src/environments/environment';
 

@Injectable({
  providedIn: 'root'
})
export class SessionService { 
  baseURL=environment.apiUrl;
  constructor(private _http:HttpClient) { } 
 
  PostSession(Session:Session){ 
    return  this._http.post(this.baseURL+'Session' + '/AddSession',Session);
  }
  getSessionById(id){
    return  this._http.get(this.baseURL+'Session' +'/'+ id);
  }
  updateSession(id: number, session: Session) {
    return this._http.put(this.baseURL+'Session' + '/' + id, session);
  }
  DelSession(id: number) {
    return this._http.delete(this.baseURL+'Session' +'/'+ id);
  }
}
