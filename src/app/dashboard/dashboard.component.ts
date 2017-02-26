import { Component, OnInit } from '@angular/core';

import { AuthService } from '../auth.service';
import { ListaService } from './lista.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user: Object;
  totais;
  title: string;
  lista: Array<Object>;
  errorMessage: string;
  charPie: Object;

  constructor(
    private listaService: ListaService,
    private auth: AuthService
  ) {
    this.user  =  auth.getUserData();
    this.title = 'Dashboard';
    this.charPie = this.createCharPie({});
  }

  createCharPie(totais) {
    const charPie = {
      type: 'pie',
      data: {
        labels: ['Alunos', 'Professores', 'Visitantes'],
        datasets: [
          {
            label: 'My First dataset',
            data: [totais.alunos, totais.professores, totais.visitantes],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      }
    };
    return charPie;
  }

  ngOnInit() {
    this.listaService.getLista().subscribe(
      dados =>  this.lista = dados || '',
      error =>  this.errorMessage = (<any>error || 'erro')
    );
    this.listaService.getTotais().subscribe(
      dados =>  {
        this.charPie = this.createCharPie(dados);
        this.totais = dados.usuarios;
        console.log(this.charPie);
      },
      error =>  this.errorMessage = (<any>error || 'erro')
    );
  }
}
