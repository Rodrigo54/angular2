import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard.routing.module';

import { DashboardComponent } from './dashboard.component';
import { ListaService } from './lista.service';
import { AdminModule } from '../admin/admin.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    AdminModule
  ],
  exports: [],
  declarations: [
    DashboardComponent,
  ],
  providers: [ ListaService ],
})
export class DashboardModule {}
