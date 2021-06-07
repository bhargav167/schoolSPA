import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGaurd } from 'src/app/_gaurd/Auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate:[AuthGaurd],
    children: [
      {
        path: 'AcadmicClass',
        loadChildren: () => import('./Acadmic-Classes/Acadmic-Classes.module').then(module => module.AcadmicClassesModule)
      },
      {
        path: 'AcadmicSection',
        loadChildren: () => import('./Acadmic-Section/Acadmic-Section.module').then(module => module.AcadmicSectionModule)
      },
      {
        path: 'AcadmicSubject',
        loadChildren: () => import('./Acadmic-Subject/Acadmic-Subject.module').then(module => module.AcadmicSubjectModule)
      },
      {
        path: 'SubjectGroup',
        loadChildren: () => import('./SubjectGroup/subjectGroup.module').then(module => module.SubjectGroupsModule)
      },
      {
        path: 'AcadmicClassTimetable',
        loadChildren: () => import('./Acadmic-ClassTimetable/Acadmic-ClassTimetable.module').then(module => module.AcadmicClassTimetableModule)
      },
      {
        path: 'AssignClassTeacher',
        loadChildren: () => import('./AssignClassTeacher/AssignClassTeacher.module').then(module => module.AssignClassTeacherModule)
      },
      {
        path: 'AddClassTimetable',
        loadChildren: () => import('./Add-ClassTimetable/Add-ClassTimetable.module').then(module => module.AddClassTimetableModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcadmicRoutingModule { }