import { TabelaService } from './../tabela/tabela.service';
import { Component } from '@angular/core';
import { TabelaComponent } from './../tabela/tabela.component';

@Component({
  selector: 'app-eventos-tabela',
  templateUrl: './../tabela/tabela.component.html',
  styleUrls: ['./../tabela/tabela.component.scss'],
  providers: [TabelaService]
})
export class EventosTabelaComponent extends TabelaComponent {}
