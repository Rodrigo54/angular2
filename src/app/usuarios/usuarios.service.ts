import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { CommonService } from './../common-service';

@Injectable()
export class UsuariosService extends CommonService {

  constructor(private http: Http) {
    super();
    this.url = this.url + '/usuarios/';
  }

  getAll() {
    return this.http.get(this.url)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  getByID(id) {
    return this.http.get(this.url + id)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
}
