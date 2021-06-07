import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthSignupRoutingModule } from './auth-signup-routing.module';
import { AuthSignupComponent } from './auth-signup.component'; 
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AuthSignupRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [AuthSignupComponent]
})
export class AuthSignupModule { }
