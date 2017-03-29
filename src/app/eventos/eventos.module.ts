import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterializeModule } from 'ng2-materialize';

import { EventosRoutingModule } from './eventos.routing.module';
import { EventosComponent } from './eventos.component';
import { EventosService } from './eventos.service';
import { EventosResolve } from './eventos.resolve';
import { EventoDetalheComponent } from './evento-detalhe/evento-detalhe.component';
import { EventoDetalheResolve } from './evento-detalhe/evento-detalhe.resolve';
import { EventosTabelaComponent } from './eventos-tabela.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterializeModule.forRoot(),
    EventosRoutingModule,
  ],
  declarations: [
    EventosComponent,
    EventoDetalheComponent,
    EventosTabelaComponent
  ],
  providers: [
    EventosService,
    EventosResolve,
    EventoDetalheResolve,
  ],
})
export class EventosModule { }
