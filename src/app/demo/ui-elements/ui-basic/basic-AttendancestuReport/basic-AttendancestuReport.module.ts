import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicAttendancestuReportComponent } from './basic-AttendancestuReport.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BasicAttendancestuReportRoutingModule } from './basic-AttendancestuReport-routing.module';
import { ScheduleAllModule,MonthService,WeekService,DayService } from '@syncfusion/ej2-angular-schedule';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    BsDatepickerModule.forRoot(),
    BasicAttendancestuReportRoutingModule,
    ScheduleAllModule
  ],
  declarations: [BasicAttendancestuReportComponent]
})
export class BasicAttendancestuReportModule { }
