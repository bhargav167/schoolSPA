import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LiveClassesComponent } from './LiveClasses.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { LiveClassRoutingModule } from './LiveClass-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    LiveClassRoutingModule
  ],
  declarations: [LiveClassesComponent]
})
export class LiveClassesModule { }
