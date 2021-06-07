import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../../../theme/shared/shared.module';
import { ZoomLiveClassRoutingModule } from './ZoomLiveClass-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ZoomLiveClassRoutingModule,
    SharedModule
  ],
  declarations: []
})
export class ZoomLiveClassModule { }