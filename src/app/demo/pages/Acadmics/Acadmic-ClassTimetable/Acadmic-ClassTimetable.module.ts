import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AcadmicClassTimetableComponent } from './Acadmic-ClassTimetable.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { AcadmicClassTimetableRoutingModule } from './Acadmic-ClassTimetable-routing.module';

@NgModule({
  imports: [
    CommonModule, 
    SharedModule,
    AcadmicClassTimetableRoutingModule
  ],
  declarations: [AcadmicClassTimetableComponent]
})
export class AcadmicClassTimetableModule { }
