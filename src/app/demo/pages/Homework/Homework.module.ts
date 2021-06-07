import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { HomeworkRoutingModule } from './Homework-routing.module';
import { HomeworkComponent } from './Homework.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker'; 
import { CKEditorModule } from 'ckeditor4-angular';


@NgModule({
  imports: [
    SharedModule,
    CommonModule, 
    CKEditorModule,
    HomeworkRoutingModule,
    BsDatepickerModule.forRoot(),
  ],
  declarations: [HomeworkComponent]
})
export class HomeworkModule { }