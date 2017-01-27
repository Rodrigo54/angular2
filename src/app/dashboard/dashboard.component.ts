import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ListaService } from '../lista.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user: Object;
  title: string;
  lista: Array<Object>;
  errorMessage: string;

  constructor(
    private router: Router,
    private listaService: ListaService,
    private auth: AuthService
  ) {
    this.user  =  auth.getUserData();
    this.title = 'dashboard works!';
  }

  ngOnInit() {
    this.listaService.getLista()
     .subscribe(
       dados => this.lista = dados,
       error =>  this.errorMessage = <any>error
     );
  }

  sair(){
    this.auth.logout().subscribe(
        (dados) => {
          this.auth.deleteToken();
          this.router.navigate(['/login'])
          console.log(dados.message);
        }
      )
    console.log('saindo');
  }
}
