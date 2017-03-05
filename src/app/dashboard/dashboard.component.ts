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
  chartPie: Object;
  chartBar: Object;
  inscricao: Subscription;

  constructor(
    private route: ActivatedRoute
  ) {
    this.chartPie = this.createChartPie({});
    this.chartBar = this.createChartBar({});
  }

  createChartPie(totais: any) {
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
      }
    };
    return charPie;
  }

  createChartBar(totais: any) {
    const dados = [
      totais.civil || '10',
      totais.producao || '20',
      totais.eletrica || '30',
      totais.mecanica || '50',
      totais.ambiental || '3'
    ];
    const chartBar = {
      type: 'bar',
      data: {
        labels: ['Civil', 'Produção', 'Eletrica', 'Mecânica', 'Ambiental'],
        datasets: [
          {
            data: dados,
            backgroundColor: ['#5c6bc0', '#ef5350', '#ffee58', '#78909c', '#9ccc65'],
            hoverBackgroundColor: ['#7986cb', '#e57373', '#fff176', '#90a4ae', '#aed581']
          }
        ]
      },
      options: {
        responsive: true,
        legend:{
          display: false
        },
        title:{
          text: 'Inscritos por Curso',
          display: true
        },
        scales: {
            xAxes: [{
                stacked: true
            }],
            yAxes: [{
                stacked: true,
             }]
        }
      }
    };
    return chartBar;
  }

  ngOnInit() {
    this.inscricao = this.route.data.subscribe(
      (dados: Object) => {
        const info = dados['info'];
        this.title = dados['title'];
        this.chartPie = this.createChartPie(info['tipo']);
        this.chartBar = this.createChartBar(info['cursos']);
        this.totais = info['totais'];
      },
      error =>  this.errorMessage = (<any>error || 'erro')
    );
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }
}
