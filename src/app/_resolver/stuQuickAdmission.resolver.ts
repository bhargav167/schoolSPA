import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import { QuickAdmission } from '../Models/QuickAdmission';
import { ClasslevelService } from '../services/classlevel.service';
 import { catchError } from 'rxjs/operators';

@Injectable()
export class stuQuickAdmission implements Resolve<QuickAdmission[]> {
    pageSize = 2;
    pageNumber = 1;
    sessionId:number;

    constructor(private userService: ClasslevelService,
        private router: Router) {} 
        resolve(route: ActivatedRouteSnapshot): Observable<QuickAdmission[]> {
            return this.userService.getQuickAdmiStudent(this.sessionId, this.pageNumber, this.pageSize).pipe(
                catchError(error => { 
                    this.router.navigate(['/home']);
                    return of(null);
                })
            );
}
}