import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingComponent } from './Setting.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { SettingRoutingModule } from './Setting-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SettingRoutingModule
  ],
  declarations: [SettingComponent]
})
export class SettingModule { }
