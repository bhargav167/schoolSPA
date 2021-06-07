import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddFeePackagingComponent } from './AddFeePackaging.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { AddFeePackagingRoutingModule } from './AddFeePackaging-routing.module';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  imports: [
    CommonModule,
    SharedModule, 
    NgbDropdownModule,
    BsDatepickerModule.forRoot(),
    AddFeePackagingRoutingModule
  ],
  declarations: [AddFeePackagingComponent]
})
export class AddFeePackagingModule { }
