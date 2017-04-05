import { Component, OnInit, AfterViewChecked, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TabelaService } from './tabela.service';
import * as $ from 'jquery';
declare var Materialize: any;

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.scss'],
  providers: [ TabelaService ]
})
export class TabelaComponent implements OnInit {

  @Input() dados;
  @Input() label;
  @Input() options;

  pageSize: number;
  pager: any = {};
  pagedItems: any[];
  searchResult;
  searchForm;
  errorMessage;
  actions = [];

  filtroReverso: boolean = false;
  filtroTipo: string;
  filtroIcon: string;


  constructor(
    private pagerService: TabelaService,
    private fb: FormBuilder,
  ) {
    this.searchForm = fb.group({
      'pesquisar': [''],
      'tipo': [''],
    });
  }

  ngOnInit() {
    this.pageSize = this.options.pageSize ? this.options.pageSize : 15;
    if (this.dados.length == 0) {
       this.errorMessage = 'Nada Encontrado';
    }
    // console.log(this.label);
    this.setPage(1);
  }

  isObject(a){
    return (typeof a === "object") && (a !== null) ;
  }

  presenca(p) {
    return p == 1 ? 'Presente' : 'Ausente';
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

  reset() {
    delete this.searchResult;
    delete this.errorMessage;
    this.searchForm.reset();
    this.pager = this.pagerService.getPager(this.dados.length, 1, this.pageSize);
    this.pagedItems = this.dados.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }

  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    } else if (typeof this.searchResult !== 'undefined') {
      this.pager = this.pagerService.getPager(this.searchResult.length, page, this.pageSize);
      this.pagedItems = this.searchResult.slice(this.pager.startIndex, this.pager.endIndex + 1);
    } else {
      this.pager = this.pagerService.getPager(this.dados.length, page, this.pageSize);
      this.pagedItems = this.dados.slice(this.pager.startIndex, this.pager.endIndex + 1);
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
      if (this.filtroReverso && this.filtroTipo == tipo) {
        this.filtroReverso = false;
        this.searchResult = this.searchResult.sort(naturalCompare).reverse();
        this.filtroIcon = 'keyboard_arrow_up';
      } else {
        this.filtroReverso = true;
        this.searchResult = this.searchResult.sort(naturalCompare);
        this.filtroTipo = tipo;
        this.filtroIcon = 'keyboard_arrow_down';
      }
    } else {
      if (this.filtroReverso && this.filtroTipo == tipo) {
        this.filtroReverso = false;
        this.dados = this.dados.sort(naturalCompare).reverse();
        this.filtroIcon = 'keyboard_arrow_up';
      } else {
        this.filtroReverso = true;
        this.dados = this.dados.sort(naturalCompare);
        this.filtroTipo = tipo;
        this.filtroIcon = 'keyboard_arrow_down';
      }
    }
    this.setPage(1);
  }

  search(dados: any) {
    const tipo = dados.tipo ? dados.tipo.toLowerCase() : this.options.labelPrimary;
    const pesquisa = dados.pesquisar ? dados.pesquisar.toLowerCase() : '';
    this.searchResult = this.dados.filter(
      (evento: any) => {
        const valor = evento[tipo].toLowerCase();
        if (valor.indexOf(pesquisa) >= 0) {
          return evento;
        }
      }
    );
    if (this.searchResult.length === 0){
      this.errorMessage = 'Nada Encontrado';
    }
    this.setPage(1);
  }

  ngAfterViewChecked() {
    Materialize.updateTextFields();
  }
}
