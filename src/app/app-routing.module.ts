import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/default',
        pathMatch: 'full'
      },
      {
        path: 'default',
        loadComponent: () => import('./demo/dashboard/default/default.component').then((c) => c.DefaultComponent)
      },
      {
        path: 'typography',
        loadComponent: () => import('./demo/elements/typography/typography.component')
      },
      {
        path: 'color',
        loadComponent: () => import('./demo/elements/element-color/element-color.component')
      },
      {
        path: 'sample-page',
        loadComponent: () => import('./demo/other/sample-page/sample-page.component')
      },
      {
        path: 'binance-data',
        loadComponent: () => import('./demo/dataextraction/binance-data/binance-data.component').then(m => m.BinanceDataComponent)
      },
      {
        path: 'data-set-manager',
        loadComponent: () => import('./demo/dataextraction/datasetmanager/data-set-manager.component').then(m => m.DataSetManagerComponent)
      },


      {
        path: 'data-set-manager/add-data-set',
        loadComponent: () => import('./demo/dataextraction/datasetmanager/adddataset/add-dataset.component').then(m => m.AddDatasetComponent)
      },


      {
        path: 'model-dashboard',
        loadComponent: () => import('./demo/aimodel/model-dashboard/model-dashboard.component').then(m => m.ModelDashboardComponent)
      },
      {
        path: 'model-dashboard/select-date',
        loadComponent: () => import('./demo/aimodel/model-data-range/model-data-range.component').then((m) => m.ModelDataRangeComponent)
      },
      {
        path: 'model-dashboard/feature-selection',
        loadComponent: () =>
          import('./demo/aimodel/feature-selection/feature-selection.component').then(
            (m) => m.FeatureSelectionComponent
          )
      },
      {
        path: 'model-dashboard/model-config',
        loadComponent: () =>
          import('./demo/aimodel/model-config/model-config.component').then(
            (m) => m.ModelConfigComponent
          )
      },
      {
        path: 'model-dashboard/labeling/:id',
        loadComponent: () =>
          import('./demo/aimodel/datalabeling/labeling.component').then((m) => m.LabelingComponent)
      },
      {
        path: 'model-dashboard/model-selection/:id',
        loadComponent: () =>
          import('./demo/aimodel/model-selection/model-selection.component').then((m) => m.ModelSelectionComponent)
      }
    ]
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'guest',
        loadChildren: () => import('./demo/pages/authentication/authentication.module').then((m) => m.AuthenticationModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
