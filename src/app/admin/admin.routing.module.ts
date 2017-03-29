import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../guards/auth.guard';
import { AdminComponent } from '../admin/admin.component';

const routes: Routes = [
  { path: '', component: AdminComponent,
    children: [
      { path: 'dashboard',
        loadChildren: 'app/dashboard/dashboard.module#DashboardModule',
        canLoad: [AuthGuard]
      },
      { path: 'eventos',
        loadChildren: 'app/eventos/eventos.module#EventosModule',
        canLoad: [AuthGuard]
      },
      { path: 'usuarios',
        loadChildren: 'app/usuarios/usuarios.module#UsuariosModule',
        canLoad: [AuthGuard]
      },
    ]
  },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule {}
