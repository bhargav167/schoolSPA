import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; 

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'fixed',
        loadChildren: () => import('./theme-fixed/theme-fixed.module').then(module => module.ThemeFixedModule)
      },
      {
        path: 'StuDash',
        loadChildren: () => import('./StudentDashboard/StudentDashboard.module').then(module => module.StudentDashboardModule)
      },
      {
        path: 'FeeStatus',
        loadChildren: () => import('./StudentFeeStatus/StudentFeeStatus.module').then(module => module.StudentFeeStatusModule)
      },
      {
        path: 'Attendance',
        loadChildren: () => import('./StuAttendance/StuAttendance.module').then(module => module.StuAttendanceModule)
      },
      {
        path: 'Timetable',
        loadChildren: () => import('./StudentTimetable/StudentTimetable.module').then(module => module.StudentTimetableModule)
      }  
    ]
  } 
];

@NgModule({
   imports: [
      RouterModule.forChild(routes)
   ],
   exports: [
      RouterModule
   ],
   declarations: [ 
   ]
})
export class LayoutRoutingModule { }
