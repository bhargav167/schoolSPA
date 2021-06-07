import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { HttpClientModule } from '@angular/common/http'; 

@NgModule({
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    HttpClientModule
  ],
  declarations: []
})
export class AuthenticationModule { };
