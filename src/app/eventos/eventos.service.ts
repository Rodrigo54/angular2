import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { CommonService } from './../common-service';

@Injectable()
export class EventosService extends CommonService {

  constructor(private http: Http) {
    super();
    this.url = this.url + '/eventos/';
  }

  getLista() {
    return this.http.get(this.url)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getEvento(id) {
    return this.http.get(this.url + id)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
}
