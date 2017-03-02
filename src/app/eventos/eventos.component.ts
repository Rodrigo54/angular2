import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit, OnDestroy {

  title: string;
  errorMessage: string;
  lista: Array<Object>;
  inscricao: Subscription;

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.inscricao = this.route.data.subscribe(
      (dados: Object) => {
        this.title = dados['title'];
        this.lista = dados['eventos'];
        // console.log(this.lista['0']);
      },
      error =>  this.errorMessage = (<any>error || 'erro')
    );
  }

  ngOnDestroy() {
    this.inscricao.unsubscribe();
  }

}
