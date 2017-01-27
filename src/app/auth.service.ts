import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../environments/environment';

@Injectable()
export class AuthService {

  private listaUrl =  environment.apiBaseUrl + '/autenticador/';
  private userData: Object;

  constructor(private http:Http) {}

  login(dados){
    var body = JSON.stringify(dados);
    return this.http.post(this.listaUrl, body)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  logout(){
    return this.http.get(this.listaUrl+'sair/')
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  setUserData(obj) {
    this.userData = this.jwtDecode(obj.token);
    localStorage.setItem('userData', JSON.stringify(this.userData));
  }

  getUserData(){
    var dados = localStorage.getItem('userData');
    return this.userData = JSON.parse(dados);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  setToken(token) {
    localStorage.setItem('token', token);
  }

  deleteToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      let body = error.json();
      errMsg = body;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  private jwtDecode(token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }

}
