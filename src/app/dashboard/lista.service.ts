import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { CommonService } from './../common-service';

@Injectable()
export class ListaService extends CommonService {

  constructor(private http: Http) {
    super();
    this.url = this.url + '/estatisticas/totais/';
  }

  getTotais() {
    return this.http.get(this.url)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
}
