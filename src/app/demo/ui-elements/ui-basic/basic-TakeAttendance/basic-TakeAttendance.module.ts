import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicTakeAttendanceComponent } from './basic-TakeAttendance.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { BasicTakeAttendanceRoutingModule } from './basic-TakeAttendance-routing.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    BsDatepickerModule.forRoot(),
    BasicTakeAttendanceRoutingModule
  ],
  declarations: [BasicTakeAttendanceComponent]
})
export class BasicTakeAttendanceModule { }
