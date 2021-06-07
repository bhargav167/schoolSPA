import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Section } from 'src/app/Models/Section';

@Injectable({
  providedIn: 'root'
})
export class SectionService {
  baseURL=environment.apiUrl;
  constructor(private _http:HttpClient) { } 

  PostSection(section:Section){ 
    return  this._http.post(this.baseURL+'Section' + '/register',section);
  }
  getSection(){
    return this._http.get(this.baseURL+'Section');
  }
  getSectionById(id){
    return  this._http.get(this.baseURL+'Section' +'/'+ id);
  }
  updateSection(id: number, sec: Section) {
    return this._http.put(this.baseURL+'Section' + '/' + id, sec);
  }
  DelSection(id: number) {
    return this._http.delete(this.baseURL+'Section' +'/'+ id);
  }
}
