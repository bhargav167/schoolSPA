import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../../theme/shared/shared.module';
import { AcadmicRoutingModule } from './Acadmic-routing.module'; 
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
@NgModule({
  imports: [
    CommonModule,
    AcadmicRoutingModule,
    SharedModule,
    NgxMaterialTimepickerModule
  ],
  declarations: []
})
export class AcadmicModule { }