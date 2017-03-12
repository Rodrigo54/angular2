import { Component, OnInit, AfterViewChecked, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PagerService } from '../pager.service';
import * as $ from 'jquery';
import { DomSanitizer } from "@angular/platform-browser/";
declare var Materialize: any;

@Component({
  selector: 'app-md-tabela',
  templateUrl: './md-tabela.component.html',
  styleUrls: ['./md-tabela.component.scss']
})
export class MdTabelaComponent implements OnInit, AfterViewChecked {

  @Input() dados;
  @Input() label;
  @Input() options;

  pageSize = 15;
  pager: any = {};
  pagedItems: any[];
  searchResult;
  searchForm;
  errorMessage;
  actions = [];


  constructor(
    private pagerService: PagerService,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer
  ) {
    this.searchForm = fb.group({
      'pesquisar': [''],
      'tipo': [''],
    });
  }

  ngOnInit() {
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

  search(dados: any) {
    const tipo = dados.tipo ? dados.tipo.toLowerCase() : this.options.labelPrimary;
    const pesquisa = dados.pesquisar ? dados.pesquisar.toLowerCase() : '';
    this.searchResult = this.dados.filter(
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

  ngAfterViewChecked() {
    Materialize.updateTextFields();
  }

}
