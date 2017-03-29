import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ChartModule } from 'angular2-chartjs';
import { MaterializeModule } from 'ng2-materialize';

import { DashboardRoutingModule } from './dashboard.routing.module';
import { DashboardComponent } from './dashboard.component';
import { ListaService } from './lista.service';
import { DadosResolve } from './dados.resolve';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ChartModule,
    MaterializeModule.forRoot(),
    DashboardRoutingModule
  ],
  exports: [],
  declarations: [
    DashboardComponent,
  ],
  providers: [ ListaService, DadosResolve ],
})
export class DashboardModule {}
