import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { AuthRegister } from 'src/app/Models/AuthRegister';
import { environment } from 'src/environments/environment';
 
@Injectable({
  providedIn: 'root'
})
export class  AuthService {
  baseURL=environment.apiUrl;
constructor(private _http:HttpClient) { }
register(authRes:AuthRegister,role:string){
  return  this._http.post(this.baseURL + 'ApplicationManager/register'+'/'+role,authRes);
  } 

  Sturegister(authRes:AuthRegister,role:string,admissionNo:string){
    return  this._http.post(this.baseURL + 'ApplicationManager/register'+'/'+role+'/'+admissionNo,authRes);
    } 
    
  login(formData,role:string){
    return  this._http.post(this.baseURL + 'ApplicationManager/login'+'/'+role,formData);
  }
  GetUserProfile(){
     return this._http.get(this.baseURL +'UserProfile');
  }
  roleMatch(allowedRoles): boolean {
    var isMatch = false;
    var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1])); 
    var userRole = payLoad.role;

    allowedRoles.forEach(element => { 
      if(userRole==element){
        isMatch = true;
        return false; 
       }   
    }); 
    return true;
  }
}
