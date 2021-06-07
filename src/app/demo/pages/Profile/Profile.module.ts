import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../../theme/shared/shared.module';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { ProfileRoutingModule } from './Profile-routing.module';
@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SharedModule,
    NgxMaterialTimepickerModule
  ],
  declarations: []
})
export class ProfileModule { }