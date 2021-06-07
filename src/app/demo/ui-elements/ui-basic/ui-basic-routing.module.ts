import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGaurd } from 'src/app/_gaurd/Auth.guard';
  
const routes: Routes = [
  {
    path: '',  
    canActivate: [AuthGaurd],
    data: { permittedRoles: ['Admin'] },
    children: [ 
      {
        path: 'student',
        loadChildren: () => import('./basic-student/basic-student.module').then(module => module.BasicStudentModule)
      },
      {
        path: 'admission',
        loadChildren: () => import('./basic-admission/basic-admission.module').then(module => module.BasicAdmissionModule)
      },
      {
        path: 'studentlist',
        loadChildren: () => import('./basic-stu-list/basic-stu-list.module').then(module => module.BasicStuListModule)
      },
      {
        path: 'studentedit/:UserId', 
        loadChildren: () => import('./basic-stu-edit/basic-stu-edit.module').then(module => module.BasicStuEditModule) 
      },
      {
        path: 'studentview/:UserId', 
        loadChildren: () => import('./basic-stu-View/basic-stu-View.module').then(module => module.BasicStuViewModule) 
      },
      {
        path: 'TakeAttendance', 
        loadChildren: () => import('./basic-TakeAttendance/basic-TakeAttendance.module').then(module => module.BasicTakeAttendanceModule)
      },
      {
        path: 'AttendanceReport', 
        loadChildren: () => import('./basic-AttendancestuReport/basic-AttendancestuReport.module').then(module => module.BasicAttendancestuReportModule)
        
      },
      //End Students

      //Start Employee
      {
        path: 'EmployeeRegister', 
        canActivate: [AuthGaurd],
        data: { permittedRoles: ['Admin'] },
        loadChildren: () => import('./basic-EmpRegister/basic-EmpRegister.module').then(module => module.BasicEmpRegisterModule)
        
      }, 
      {
        path: 'emplist',
        canActivate: [AuthGaurd],
        data: { permittedRoles: ['Admin'] },
        loadChildren: () => import('./basic-Emp-list/basic-Emp-list.module').then(module => module.BasicEmpListModule)
      },
      {
        path: 'employeeview/:id', 
        loadChildren: () => import('./basic-emp-View/basic-emp-View.module').then(module => module.BasicEmpViewModule) 
      },
      {
        path: 'empedit/:id', 
        canActivate: [AuthGaurd],
        data: { permittedRoles: ['Admin'] },
        loadChildren: () => import('./basic-emp-edit/basic-emp-edit.module').then(module => module.BasicEmpEditModule) 
      },
      {
        path: 'spinner',
        loadChildren: () => import('./basic-spinner/basic-spinner.module').then(module => module.BasicSpinnerModule)
      },  
      {
        path: 'feeStatus/:id/:standers/:classsection',
        loadChildren: () => import('./basic-Feestatus/basic-Feestatus.module').then(module => module.BasicFeestatusModule)
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UiBasicRoutingModule { }
