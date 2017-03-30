import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {


  title: string;
  errorMessage: string;
  lista: Array<Object>|any;
  inscricao: Subscription;

  labelTabela = [
    {value: 'nome', name: 'Nome'},
    {value: 'email', name: 'Email'},
    {value: 'curso', name: 'Curso'},
    {value: 'telefone', name: 'Telefone'},
  ];
  optionsTabela = {
    search: true,
    labelPrimary: 'nome',
    pageSize: 25,
  };

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.inscricao = this.route.data.subscribe(
      (dados: Object) => {
        this.title = dados['title'];
        this.lista = dados['lista'];
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
