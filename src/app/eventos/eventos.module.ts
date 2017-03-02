import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventosRoutingModule } from './eventos.routing.module';
import { EventosComponent } from './eventos.component';
import { AdminModule } from '../admin/admin.module';
import { EventosService } from './eventos.service';
import { EventosResolve } from './eventos.resolve';

@NgModule({
  imports: [
    CommonModule,
    EventosRoutingModule,
    AdminModule
  ],
  declarations: [
    EventosComponent,
  ],
  providers: [ EventosService, EventosResolve ],
})
export class EventosModule { }
