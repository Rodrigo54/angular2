import { Component, OnInit, OnDestroy, AfterViewChecked } from '@angular/core';
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
export class EventosComponent implements OnInit, OnDestroy, AfterViewChecked {

  title: string;
  errorMessage: string;
  lista: Array<Object>|any;
  inscricao: Subscription;
  pageSize = 15;

  searchForm: FormGroup;
  searchResult: Array<Object>;
  selectOptions = [
    {value: 'titulo', name: 'Titulo'},
    {value: 'tipo', name: 'Tipo'},
    {value: 'palestrante', name: 'Palestrante'},
    {value: 'horario', name: 'Horário'},
    {value: 'data', name: 'Data'},
    {value: 'vagas', name: 'Vagas'},
  ];

  pager: any = {};
  pagedItems: any[];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private pagerService: PagerService
  ) {
    this.searchForm = fb.group({
      'pesquisar': [''],
      'tipo': [''],
    });

  }

  ngOnInit() {
    this.inscricao = this.route.data.subscribe(
      (dados: Object) => {
        this.title = dados['title'];
        this.lista = dados['eventos'];
      }
    );
    if ( Array.isArray(this.lista) ) {
      this.setPage(1);
    } else {
      this.errorMessage = this.lista.message;
      this.pagedItems = [];
      this.lista = [];
    }
  }

  search(dados: any) {
    const tipo = dados.tipo ? dados.tipo.toLowerCase() : 'titulo';
    const pesquisa = dados.pesquisar ? dados.pesquisar.toLowerCase() : '';
    this.searchResult = this.lista.filter(
      (evento: any) => {
        const valor = evento[tipo].toLowerCase();
        if (valor.search(pesquisa) !== -1) {
          return evento;
        }
      }
    );
    if (this.searchResult.length === 0){
      this.errorMessage = 'Nada Encontrado';
    }
    this.setPage(1);
  }

  reset() {
    delete this.searchResult;
    delete this.errorMessage;
    this.searchForm.reset();
    this.pager = this.pagerService.getPager(this.lista.length, 1, this.pageSize);
    this.pagedItems = this.lista.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    } else if (typeof this.searchResult !== 'undefined') {
      this.pager = this.pagerService.getPager(this.searchResult.length, page, this.pageSize);
      this.pagedItems = this.searchResult.slice(this.pager.startIndex, this.pager.endIndex + 1);
    } else {
      this.pager = this.pagerService.getPager(this.lista.length, page, this.pageSize);
      this.pagedItems = this.lista.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }
  }

  rowClick(event, el) {
    const elem = $(el).find('[type="checkbox"]');
    if (elem.prop('checked') === false) {
      $(elem).prop('checked', true);
       $(el).toggleClass('active', true);
    } else {
      $(elem).prop('checked', false);
      $(el).toggleClass('active', false);
    }
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

  ngAfterViewChecked() {
    Materialize.updateTextFields();
  }

}
