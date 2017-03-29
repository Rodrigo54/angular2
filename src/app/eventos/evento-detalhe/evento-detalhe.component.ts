import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import * as $ from 'jquery';
declare var Materialize: any;

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss']
})
export class EventoDetalheComponent implements OnInit, OnDestroy {

  inscricao: Subscription;
  title: string;
  evento: object;
  errorMessage: string;
  labelTabela = [
    {value: 'nome', name: 'Nome'},
    {value: 'cpf', name: 'CPF'},
    {value: 'email', name: 'Email'},
    // {value: 'presenca', name: 'Presença', class: 'center'},
  ];
  optionsTabela = {
    search: true,
    labelPrimary: 'nome',
    eventoDetalhe: true,
    actions: [
      // { name: 'Editar', class: 'blue', icon: 'edit', routerLink:{ key: 'id_usuario', path: 'edit/'} },
      // { name: 'Presença', class: 'blue', icon: 'edit' }
    ]
  };

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.inscricao = this.route.data.subscribe(
      (dados: Object) => {
        this.title = dados['title'];
        this.evento = dados['evento'];
      }
    );
    if (this.evento['message']){
      this.errorMessage = this.evento['message'];
    }
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

}
