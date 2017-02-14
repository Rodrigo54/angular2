import { Injectable } from '@angular/core';
import { Request, XHRBackend, BrowserXhr, ResponseOptions, XSRFStrategy, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ExtendedXHRBackend extends XHRBackend {

  constructor(browserXhr: BrowserXhr, baseResponseOptions: ResponseOptions, xsrfStrategy: XSRFStrategy) {
    super(browserXhr, baseResponseOptions, xsrfStrategy);
  }

  createConnection(request: Request) {
    let token = localStorage.getItem('token');
    if(token) {
      request.headers.set('Authorization', `${token}`);
    }
    request.headers.set('Content-Type', 'application/json; charset=utf-8');
    let xhrConnection = super.createConnection(request);
    xhrConnection.response = xhrConnection.response.catch((error: Response) => {
      if (error.status === 401 || error.status === 403 || error.status === 0) {
        var msg = `${error.status} - ${error.statusText || ''}`
        console.error('acesso não autorizado');
        console.error(msg);
        localStorage.removeItem('token');
      }
      return Observable.throw(error);
    });
    return xhrConnection;
  }
}
