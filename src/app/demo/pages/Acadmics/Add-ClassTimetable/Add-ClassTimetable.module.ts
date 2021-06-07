import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddClassTimetableComponent } from './Add-ClassTimetable.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { AddClassTimetableRoutingModule } from './Add-ClassTimetable-routing.module';  
import { NgbTabsetModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule} from '@angular/forms';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    NgbTabsetModule,
    ReactiveFormsModule,
    AddClassTimetableRoutingModule,
    NgxMaterialTimepickerModule
  ],
  declarations: [AddClassTimetableComponent]
})
export class AddClassTimetableModule { }
