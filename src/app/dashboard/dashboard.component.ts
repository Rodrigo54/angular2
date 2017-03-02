import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  totais;
  title: string;
  errorMessage: string;
  charPie: Object;
  inscricao: Subscription;

  constructor(
    private route: ActivatedRoute
  ) {
    this.charPie = this.createCharPie({});
  }

  createCharPie(totais: any) {
    const dados = [totais.alunos || '1', totais.professores || '2', totais.visitantes || '3'];
    const charPie = {
      type: 'pie',
      data: {
        labels: ['Alunos', 'Professores', 'Visitantes'],
        datasets: [
          {
            label: 'My First dataset',
            data: dados,
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
    this.inscricao = this.route.data.subscribe(
      (dados: Object) => {
        const info = dados['info'];
        this.title = dados['title'];
        this.charPie = this.createCharPie(info);
        this.totais = info['usuarios'];
      },
      error =>  this.errorMessage = (<any>error || 'erro')
    );
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }
}
