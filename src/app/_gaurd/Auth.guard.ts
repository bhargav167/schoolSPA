import { Injectable } from '@angular/core'; 
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/AuthServices/Auth.service';
 
@Injectable({
    providedIn:'root'
})
export class AuthGaurd implements CanActivate  {
    
    constructor(private _router: Router, private _services: AuthService) {
    }
  canActivate(
      next:ActivatedRouteSnapshot,
      state:RouterStateSnapshot): boolean{
          if(localStorage.getItem('token')!=null){
              let role=next.data['permittedRoles'] as Array<string>; 
              if(role){
                  if(this._services.roleMatch(role))
                    return true;
                  else{
                       this._router.navigateByUrl('/Forbidden');
                       return false;
                  }
              }
            return true;
          } 
          else {
              this._router.navigate(['/auth/signin'])
              return false;
          }
        }
  
}
