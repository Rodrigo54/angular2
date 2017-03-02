import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { AdminComponent } from '../admin/admin.component';
import { DadosResolve } from './dados.resolve';

const dashboardRoutes: Routes = [
  { path: '', component: AdminComponent,
    children: [
      { path: '', component: DashboardComponent,
        data: { title: 'Dashboard' },
        resolve: { info: DadosResolve }
      },
    ]
  },
];

@NgModule({
    imports: [RouterModule.forChild(dashboardRoutes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule {}
