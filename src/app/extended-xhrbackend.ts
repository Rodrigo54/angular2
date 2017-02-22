import { Injectable } from '@angular/core';
import { Request, XHRBackend, BrowserXhr, ResponseOptions, XSRFStrategy, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Router } from '@angular/router';

@Injectable()
export class ExtendedXHRBackend extends XHRBackend {

  constructor(
    browserXhr: BrowserXhr,
    baseResponseOptions: ResponseOptions,
    xsrfStrategy: XSRFStrategy,
    private router: Router,
  ) {
    super(browserXhr, baseResponseOptions, xsrfStrategy);
  }

  createConnection(request: Request) {
    const token = localStorage.getItem('token');
    if (token) {
      request.headers.set('Authorization', `${token}`);
    }
    request.headers.set('Content-Type', 'application/json; charset=utf-8');
    const xhrConnection = super.createConnection(request);
    xhrConnection.response = xhrConnection.response.catch((error: Response) => {
      if (error.status === 401 || error.status === 403 || error.status === 0) {
        const msg = `${error.status} - ${error.statusText || ''}`;
        console.error('acesso não autorizado');
        console.error(msg);
        localStorage.removeItem('token');
        this.router.navigate(['/']);
      }
      return Observable.throw(error);
    });
    return xhrConnection;
  }
}
