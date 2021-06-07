import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicFeepackagingComponent } from './basic-Feepackaging.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { BasicFeesPackagingRoutingModule } from './basic-Feepackaging-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    BasicFeesPackagingRoutingModule
  ],
  declarations: [BasicFeepackagingComponent]
})
export class BasicFeepackagingModule { }
