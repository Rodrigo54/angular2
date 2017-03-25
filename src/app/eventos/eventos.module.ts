import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterializeModule } from 'ng2-materialize';

import { EventosRoutingModule } from './eventos.routing.module';
import { EventosComponent } from './eventos.component';
import { AdminModule } from '../admin/admin.module';
import { EventosService } from './eventos.service';
import { EventosResolve } from './eventos.resolve';
import { PagerService } from './pager.service';
import { EventoDetalheComponent } from './evento-detalhe/evento-detalhe.component';
import { EventoDetalheResolve } from './evento-detalhe/evento-detalhe.resolve';
import { MdTabelaComponent } from './md-tabela/md-tabela.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterializeModule.forRoot(),
    EventosRoutingModule,
    AdminModule
  ],
  declarations: [
    EventosComponent,
    EventoDetalheComponent,
    MdTabelaComponent,
  ],
  providers: [
    EventosService,
    EventosResolve,
    EventoDetalheResolve,
    PagerService
  ],
})
export class EventosModule { }
