import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import { QuickAdmission } from '../Models/QuickAdmission';
import { ClasslevelService } from '../services/classlevel.service';
 import { catchError } from 'rxjs/operators';

@Injectable()
export class stuQuickAdmissionEdit implements Resolve<QuickAdmission> { 
    constructor(private userService: ClasslevelService,
        private router: Router) {} 
        resolve(route: ActivatedRouteSnapshot): Observable<QuickAdmission> {
            return this.userService.getQuickStudent(route.params['id']).pipe(
                catchError(error => { 
                    this.router.navigate(['/members']);
                    return of(null);
                })
            );
        }
}