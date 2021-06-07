import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicFeeparticularComponent } from './basic-Feeparticular.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { BasicFeesRoutingModule } from './basic-Feeparticular-routing.module';
 
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    BasicFeesRoutingModule 
  ],
  declarations: [BasicFeeparticularComponent]
})
export class BasicFeeparticularModule { }
