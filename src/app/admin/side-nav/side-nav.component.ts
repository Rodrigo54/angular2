import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { User } from './../../user';

import { AuthService } from '../../auth.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  user: User;

  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  isActive(rota): boolean {
    let rotaAtual = this.router.url;
    return rotaAtual.indexOf(rota) !== -1;
  }

  ngOnInit() {
     this.user  =  this.auth.getUserData();
  }

  clicker(event, arrow) {
    event.preventDefault();
    const text = $(arrow).text();
    if (text === 'keyboard_arrow_left') {
      $(arrow).text('keyboard_arrow_down');
    }else {
      $(arrow).text('keyboard_arrow_left');
    }
  }

  sair(event) {
    event.preventDefault();
    this.auth.logout().subscribe(
      (dados) => {
        this.auth.deleteToken();
        this.router.navigate(['/login']);
        console.log(dados.message);
      }
    );
    console.log('saindo...');
  }
}
