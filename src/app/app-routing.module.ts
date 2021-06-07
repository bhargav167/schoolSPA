import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component'; 
import {AuthComponent} from './theme/layout/auth/auth.component';
import { AuthGaurd } from './_gaurd/Auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate:[AuthGaurd], 
    children: [
      {
        path: '',
        redirectTo: '/layout/fixed',
        pathMatch: 'full',
        canActivate:[AuthGaurd],
        data:{permittedRoles:['Admin']}
      },
      {
        path: '',
        redirectTo: '/layout/StuDash',
        pathMatch: 'full',
        canActivate:[AuthGaurd],
        data:{permittedRoles:['Student']}
      }, 
      {
        path: 'layout',
        loadChildren: () => import('./demo/pages/layout/layout.module').then(module => module.LayoutModule) 
      },
      {
        path: 'basic',
        loadChildren: () => import('./demo/ui-elements/ui-basic/ui-basic.module').then(module => module.UiBasicModule)
      },
      {
        path: 'forms',
        loadChildren: () => import('./demo/pages/form-elements/form-elements.module').then(module => module.FormElementsModule)
      },
      {
        path: 'tbl-bootstrap',
        loadChildren: () => import('./demo/pages/tables/tbl-bootstrap/tbl-bootstrap.module').then(module => module.TblBootstrapModule)
      },
      {
        path: 'charts',
        loadChildren: () => import('./demo/pages/core-chart/core-chart.module').then(module => module.CoreChartModule)
      },
      {
        path: 'maps',
        loadChildren: () => import('./demo/pages/core-maps/core-maps.module').then(module => module.CoreMapsModule)
      }, 
      {
        path: 'Forbidden',
        loadChildren: () => import('./demo/pages/Forbidden/Forbidden.module').then(module => module.ForbiddenModule)
      },
      {
        path: 'Acadmic',
        loadChildren: () => import('./demo/pages/Acadmics/Acadmic.module').then(module => module.AcadmicModule)
      },
      {
        path: 'Profile',
        loadChildren: () => import('./demo/pages/Profile/Profile.module').then(module => module.ProfileModule)
      },
      {
        path: 'homework',
        loadChildren: () => import('./demo/pages/Homework/Homework.module').then(module => module.HomeworkModule)
      },
      {
        path: 'ZoomLiveClass',
        loadChildren: () => import('./demo/pages/ZoomLiveClass/ZoomLiveClass.module').then(module => module.ZoomLiveClassModule)
      }
    ]
  },
  {
    path: '',
    component: AuthComponent,
    children: [ 
      {
        path: 'auth',
        loadChildren: () => import('./demo/pages/authentication/authentication.module').then(module => module.AuthenticationModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
