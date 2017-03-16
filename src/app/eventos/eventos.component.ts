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
  filtroReverso:boolean = false;

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

  filtro(tipo) {
    function naturalCompare(a, b) {
      var ax = [], bx = [];

      a[tipo].replace(/(\d+)|(\D+)/g, function(_, $1, $2) { ax.push([$1 || Infinity, $2 || ""]) });
      b[tipo].replace(/(\d+)|(\D+)/g, function(_, $1, $2) { bx.push([$1 || Infinity, $2 || ""]) });

      while(ax.length && bx.length) {
          var an = ax.shift();
          var bn = bx.shift();
          var nn = (an[0] - bn[0]) || an[1].localeCompare(bn[1]);
          if(nn) return nn;
      }

      return ax.length - bx.length;
    }
    if (typeof this.searchResult !== 'undefined') {
      if (this.filtroReverso) {
        this.filtroReverso = false;
        this.searchResult = this.searchResult.sort(naturalCompare).reverse();
      } else {
        this.filtroReverso = true;
        this.searchResult = this.searchResult.sort(naturalCompare);
      }
    } else {
      if (this.filtroReverso) {
        this.filtroReverso = false;
        this.lista = this.lista.sort(naturalCompare).reverse();
      } else {
        this.filtroReverso = true;
        this.lista = this.lista.sort(naturalCompare);
      }
    }
    this.setPage(1);
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
