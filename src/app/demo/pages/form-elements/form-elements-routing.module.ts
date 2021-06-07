import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'basic',
        loadChildren: () => import('./basic-elements/basic-elements.module').then(module => module.BasicElementsModule)
      },
      {
        path: 'Feeparticular',
        loadChildren: () => import('./basic-Feeparticular/basic-Feeparticular.module').then(module => module.BasicFeeparticularModule)
      },
      {
        path: 'Feepackaging',
        loadChildren: () => import('./basic-Feepackaging/basic-Feepackaging.module').then(module => module.BasicFeepackagingModule)
      },
      {
        path: 'AddFeePackaging',
        loadChildren: () => import('./AddFeePackaging/AddFeePackaging.module').then(module => module.AddFeePackagingModule)
      },
      {
        path: 'CollectFee',
        loadChildren: () => import('./basic-CollectFee/basic-CollectFee.module').then(module => module.BasicCollectFeeModule)
      },
      {
        path: 'Setting',
        loadChildren: () => import('./Setting/Setting.module').then(module => module.SettingModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormElementsRoutingModule { }
