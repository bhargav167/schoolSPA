import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { AdminProfileRoutingModule } from './AdminProfile-routing.module';
import { AdminProfileComponent } from './AdminProfile.component';
@NgModule({
  imports: [
    CommonModule, 
    SharedModule,
    AdminProfileRoutingModule
  ],
  declarations: [AdminProfileComponent]
})
export class AdminProfileModule { }
