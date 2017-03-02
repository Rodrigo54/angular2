import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EventosComponent } from './eventos.component';
import { AdminComponent } from '../admin/admin.component';
import { EventosResolve } from './eventos.resolve';

const routes: Routes = [
  { path: '', component: AdminComponent,
    children: [
      { path: '', component: EventosComponent,
        data: { title: 'Eventos' },
        resolve: { eventos: EventosResolve }
      },
    ]
  },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EventosRoutingModule {}
