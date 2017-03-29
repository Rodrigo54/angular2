import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable()
export class UsuariosService {

  private url = environment.apiBaseUrl + '/usuarios/';

  constructor(private http: Http) { }

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

  private extractData(res: Response) {
    const body = res.json();
    return body || { };
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: any;
    if (error instanceof Response) {
      const body = error.json();
      errMsg = body;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg.message);
    return Observable.throw(errMsg);
  }
}