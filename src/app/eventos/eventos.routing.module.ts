import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EventosComponent } from './eventos.component';
import { AdminComponent } from '../admin/admin.component';
import { EventosResolve } from './eventos.resolve';
import { EventoDetalheComponent } from './evento-detalhe/evento-detalhe.component';
import { EventoDetalheResolve } from './evento-detalhe/evento-detalhe.resolve';

const routes: Routes = [
  { path: '', component: AdminComponent,
    children: [
      { path: '', component: EventosComponent,
        data: { title: 'Eventos' },
        resolve: { eventos: EventosResolve }
      },
      { path: ':id', component: EventoDetalheComponent,
        data: { title: 'Evento' },
        resolve: { evento: EventoDetalheResolve }
      },
    ]
  },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class EventosRoutingModule {}
