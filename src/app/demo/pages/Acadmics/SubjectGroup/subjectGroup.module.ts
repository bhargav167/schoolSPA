import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { SubjectGroupRoutingModule } from './SubjectGroup-routing.module';
import { SubjectGroupComponent } from './SubjectGroup.component';
@NgModule({
  imports: [
    CommonModule, 
    SharedModule,
    SubjectGroupRoutingModule
  ],
  declarations: [SubjectGroupComponent]
})
export class SubjectGroupsModule { }
