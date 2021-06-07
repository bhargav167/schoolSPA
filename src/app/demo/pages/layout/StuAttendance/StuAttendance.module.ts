import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StuAttendanceComponent } from './StuAttendance.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { StuAttendanceRoutingModule } from './StuAttendance-routing.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ScheduleAllModule,MonthService,WeekService,DayService } from '@syncfusion/ej2-angular-schedule';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    StuAttendanceRoutingModule, 
    BsDatepickerModule.forRoot(), 
    ScheduleAllModule
  ],
  declarations: [StuAttendanceComponent]
})
export class StuAttendanceModule { }
