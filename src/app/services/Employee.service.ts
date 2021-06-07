import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'; 
import { EmpRegister } from '../Models/EmpRegister';
import { PaginatedResult } from '../Models/Pagination';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  baseURL=environment.apiUrl;
  constructor(private _http:HttpClient) { }

  getEmp(id): Observable<EmpRegister> {
    return this._http.get<EmpRegister>(this.baseURL + 'Employee/EmpIds/' + id);
  }
  getEmpRegistration(sessionId:number,page?, itemsPerPage?, userParams?): Observable<PaginatedResult<EmpRegister[]>> {
    const paginatedResult: PaginatedResult<EmpRegister[]> = new PaginatedResult<EmpRegister[]>();

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
    return this._http.get<EmpRegister[]>(this.baseURL + 'Employee/AllEmpRegistration/'+sessionId, { observe: 'response', params})
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

  getTeacher(){ 
    return this._http.get<EmpRegister[]>(this.baseURL + 'Employee/AllEmpRegistration/') 
  }

  register(empRegister: EmpRegister) { 
  var stringStanders=  empRegister.standers.toString(); 
  empRegister.standers=stringStanders; 
    return this._http.post(this.baseURL + 'Employee/register', empRegister);
  } 
  updateEmployee(id:number,emp:EmpRegister){
    return  this._http.put(this.baseURL+'Employee/' + id,emp);
    }
    getLastEmpRegisterId(){
      return this._http.get(this.baseURL+'Employee/' + 'last/');
    }
}