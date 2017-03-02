import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { ChartModule } from 'angular2-chartjs';

import { DashboardComponent } from './dashboard.component';
import { ListaService } from './lista.service';
import { AdminModule } from '../admin/admin.module';
import { DadosResolve } from './dados.resolve';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ChartModule,
    DashboardRoutingModule,
    AdminModule
  ],
  exports: [],
  declarations: [
    DashboardComponent,
  ],
  providers: [ ListaService, DadosResolve ],
})
export class DashboardModule {}
