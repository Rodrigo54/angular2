import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../auth.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  user: Object;

  constructor(
    private router: Router,
    private auth: AuthService
  ) {
    this.user  =  auth.getUserData();
  }

  ngOnInit() {

  }

  clicker(event, arrow) {
    event.preventDefault();
    const text = $(arrow).find('.right').text();
    // let text = arrow.getElementsByClassName("right")["0"].innerHTML;
    // console.log(text);
    if (text === 'keyboard_arrow_left') {
      $(arrow).find('.right').text('keyboard_arrow_down');
      // arrow.getElementsByClassName("right")["0"].innerHTML = "keyboard_arrow_down";
    }else {
      $(arrow).find('.right').text('keyboard_arrow_left');
      // arrow.getElementsByClassName("right")["0"].innerHTML = "keyboard_arrow_right";
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
    console.log('saindo');
  }
}
