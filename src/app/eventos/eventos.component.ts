import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

import { PagerService } from './pager.service';
import * as $ from 'jquery';
declare var Materialize: any;

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit, OnDestroy {

  title: string;
  errorMessage: string;
  lista: Array<Object>|any;
  inscricao: Subscription;

  labelTabela = [
    {value: 'titulo', name: 'Titulo'},
    {value: 'tipo', name: 'Tipo'},
    {value: 'palestrante', name: 'Palestrante'},
    {value: 'horario', name: 'Horário'},
    {value: 'data', name: 'Data'},
    {value: 'vagas', name: 'Vagas', class: 'center'},
  ];
  optionsTabela = {
    search: true,
    labelPrimary: 'titulo',
    eventoDetalhe: false,
    actions: [
      { name: 'Abrir', class: 'blue-text', icon: 'open_in_new', routerLink: 'id' },
      { name: 'Editar', class: 'green-text', icon: 'edit', routerLink:{ key: 'id', path: '/edit'} },
      { name: 'PDF', class: 'orange-text', icon: 'insert_chart', link: 'https://material.io/icons/' },
      { name: 'Apagar', class: 'red-text', icon: 'delete', link: 'https://material.io/icons/' },
      // { name: 'Presença', class: 'blue', icon: 'edit' }
    ]
  };


  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.inscricao = this.route.data.subscribe(
      (dados: Object) => {
        this.title = dados['title'];
        this.lista = dados['eventos'];
      }
    );
    if ( !Array.isArray(this.lista) ) {
      this.errorMessage = this.lista.message;
      this.lista = [];
    }
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

}
