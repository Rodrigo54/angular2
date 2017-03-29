import { Component } from '@angular/core';
import { TabelaComponent } from './../tabela/tabela.component';
import { TabelaService } from './../tabela/tabela.service';

@Component({
  selector: 'app-usuarios-tabela',
  templateUrl: './../tabela/tabela.component.html',
  styleUrls: ['./../tabela/tabela.component.scss'],
  providers: [TabelaService]
})
export class UsuariosTabelaComponent extends TabelaComponent {}
