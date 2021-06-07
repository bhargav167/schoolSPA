import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 
import { AssignClassTeacherComponent } from './AssignClassTeacher.component';
const routes: Routes = [
    {
        path: '',
        component: AssignClassTeacherComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AssignClassTeacherRoutingModule { }