import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentTimetableComponent } from './StudentTimetable.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { StudentTimetableRoutingModule } from './StudentTimetable-routing.module'; 

@NgModule({
  imports: [
    CommonModule,
    SharedModule, 
    StudentTimetableRoutingModule
  ],
  declarations: [StudentTimetableComponent]
})
export class StudentTimetableModule { }
