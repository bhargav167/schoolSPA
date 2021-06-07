import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'; 
import { QuickAdmission } from '../Models/QuickAdmission';
import { map } from 'rxjs/operators';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { PaginatedResult } from '../Models/Pagination';
import { Observable } from 'rxjs';
import { stuEduDetails } from '../Models/stuEduDetails';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClasslevelService { 
  baseURL=environment.apiUrl;
constructor(private _http:HttpClient) { }

public getClass(id:number){
  return this._http.get(this.baseURL+'QuickAdmission/'+id);
}
public getClasses(){
  return this._http.get(this.baseURL+'QuickAdmission/AllClasses');
}
public getSection(classes:string){
  return this._http.get(this.baseURL+'QuickAdmission/Sec/'+classes);
}

register(student:QuickAdmission){
  return  this._http.post(this.baseURL + 'QuickAdmission/register',student);
  } 

  getQuickAdmiStudent(sessionId:number,page?, itemsPerPage?, userParams?): Observable<PaginatedResult<QuickAdmission[]>> {
    const paginatedResult: PaginatedResult<QuickAdmission[]> = new PaginatedResult<QuickAdmission[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    } 

    if (userParams != null) { 
      params = params.append('AdmissionNo', userParams.AdmissionNo);
      params = params.append('OrderBy', userParams.OrderBy);
      params = params.append('Gender', userParams.Gender);
    }
    return this._http.get<QuickAdmission[]>(this.baseURL + 'QuickAdmission/AllQuickAdmission'+'/'+sessionId, { observe: 'response', params})
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
         
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
          }
          return paginatedResult;
        })
      );
  }

  getQuickStudent(id): Observable<QuickAdmission> {
    return this._http.get<QuickAdmission>(this.baseURL + 'QuickAdmission/QuickStudent/' + id);
  } 

  getEduStudent(id): Observable<stuEduDetails> {
    return this._http.get<stuEduDetails>(this.baseURL+'QuickAdmission/' + id+'/EduStudent');
  }

  updateAdmission(id:number,student:QuickAdmission){
    return  this._http.put(this.baseURL+'QuickAdmission/' + id,student);
    }

  registerUpdateEdu(id: number, studentEdu: stuEduDetails) {
    return this._http.put(this.baseURL+'QuickAdmission/' + id + '/EduRegister', studentEdu);
  } 

  getLastAdmissionId(){
    return this._http.get(this.baseURL+'QuickAdmission/' + 'last/');
  }
  getCred(userId:string){
    return this._http.get(this.baseURL+'ApplicationManager/' + 'IsCread/'+userId);
  }
}