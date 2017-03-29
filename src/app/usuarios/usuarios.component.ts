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
    // eventoDetalhe: false,
    // actions: [
    //   { name: 'Abrir', class: 'blue-text', icon: 'open_in_new', routerLink: 'id' },
    //   { name: 'Editar', class: 'green-text', icon: 'edit', routerLink:{ key: 'id', path: '/edit'} },
    //   { name: 'PDF', class: 'orange-text', icon: 'insert_chart', link: 'https://material.io/icons/' },
    //   { name: 'Apagar', class: 'red-text', icon: 'delete', link: 'https://material.io/icons/' },
    //   // { name: 'Presença', class: 'blue', icon: 'edit' }
    // ]
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
}
