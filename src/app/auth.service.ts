import { CommonService } from './common-service';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { User } from './user';

@Injectable()
export class AuthService extends CommonService {

  private userData: User;

  constructor(private http: Http) {
    super();
    this.url = this.url + '/autenticador/';
  }

  login(dados) {
    const body = JSON.stringify(dados);
    return this.http.post(this.url, body)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  logout() {
    return this.http.get(this.url + 'sair/')
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  setUserData(obj) {
    this.userData = this.jwtDecode(obj.token);
    localStorage.setItem('userData', JSON.stringify(this.userData));
  }

  getUserData(): User {
    const dados = localStorage.getItem('userData');
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

  private jwtDecode(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }

}
