import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
import { ListaService } from '../lista.service';

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
    private listaService: ListaService,
    private router: Router,
    private auth: AuthService
  ) {
    this.user  =  auth.getUserData();
    this.title = 'dashboard works!';
  }

  ngOnInit() {
    this.listaService.getLista()
     .subscribe(
       dados =>  this.lista = dados || '',
       error =>  this.errorMessage = (<any>error || 'erro')
     );
  }
}
