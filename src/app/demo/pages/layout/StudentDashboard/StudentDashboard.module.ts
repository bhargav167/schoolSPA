import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentDashboardComponent } from './StudentDashboard.component';
import { SharedModule } from 'src/app/theme/shared/shared.module'; 
import { StudentDashboardRoutingModule } from './StudentDashboard-routing.module'; 
import { StudentFeeStatusModule } from '../StudentFeeStatus/StudentFeeStatus.module';

@NgModule({ 
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    SharedModule,
    StudentDashboardRoutingModule,
    StudentFeeStatusModule,
    
  ],
  declarations: [StudentDashboardComponent,]
})
export class StudentDashboardModule { } 