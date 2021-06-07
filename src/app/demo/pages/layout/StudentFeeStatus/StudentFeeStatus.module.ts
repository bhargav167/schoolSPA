import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentFeeStatusComponent } from './StudentFeeStatus.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { StudentFeeStatusRoutingModule } from './StudentFeeStatus-routing.module';

@NgModule({
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    SharedModule,
    StudentFeeStatusRoutingModule
  ],
  declarations: [StudentFeeStatusComponent],
  exports: [StudentFeeStatusComponent],
})
export class StudentFeeStatusModule {}
