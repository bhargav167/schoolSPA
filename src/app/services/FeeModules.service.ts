import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { FeeParticular } from '../Models/FeeParticular';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeeModulesService {
  baseURL=environment.apiUrl;
  constructor(private _http:HttpClient) { }
  
  public getFeeTypes(classes:string,stuId?:number) {
    if(stuId==undefined){
      stuId=0;
    }
    return this._http.get(this.baseURL+'FeeModule/' + classes+'/'+stuId);
  }

  public getFeeParticular(id:number) {
    return this._http.get(this.baseURL+'FeeModule/Fee/' + id);
  }

  public getFeeStatus(stuId:number,stander:string,sec:string) {
    return this._http.get(this.baseURL+'FeeModule/FeeStatus/' + stuId+'/'+stander+'/'+sec);
  }

  public getStuByClass(classes:string,sec:string) {
    return this._http.get(this.baseURL+'FeeModule/Stu/' + classes+'/'+sec);
  } 
  
  register(feeparticular:FeeParticular){  
     return  this._http.post(this.baseURL + 'FeeModule/register',feeparticular);
    } 
     
  UpdateTermsWise(feeparticular:FeeParticular){  
    return  this._http.post(this.baseURL + 'FeeModule/particulars',feeparticular);
   } 

    registerOne(feeparticular:FeeParticular){ 
      return  this._http.post<FeeParticular>(this.baseURL + 'FeeModule/register',feeparticular);
     } 

    CollectFees(feeparticular:FeeParticular[]){  
      return  this._http.post<FeeParticular[]>(this.baseURL + 'FeeModule/TermFeeUpdate',feeparticular);
     } 

     CollectFeesTerm2(feeparticular:FeeParticular[]){  
      return  this._http.post<FeeParticular[]>(this.baseURL + 'FeeModule/TermFeeUpdate2',feeparticular);
     } 
 
}
