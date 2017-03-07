import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterializeModule } from 'angular2-materialize';

import { EventosRoutingModule } from './eventos.routing.module';
import { EventosComponent } from './eventos.component';
import { AdminModule } from '../admin/admin.module';
import { EventosService } from './eventos.service';
import { EventosResolve } from './eventos.resolve';
import { PagerService } from './pager.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterializeModule,
    EventosRoutingModule,
    AdminModule
  ],
  declarations: [
    EventosComponent,
  ],
  providers: [ EventosService, EventosResolve, PagerService ],
})
export class EventosModule { }
