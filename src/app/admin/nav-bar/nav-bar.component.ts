import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../auth.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  hidden = false;

  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit() {
  }

  sideHidden(event) {
    event.preventDefault();
    const sideNav = $('#sideNav');
    // let sideNav = document.querySelector("#sideNav");
    const main = $('#main');
    // let main = document.querySelector("#main");
    if (this.hidden === false) {
      main.removeClass('l9');
      sideNav.attr('style', 'transform: translateX(-100%); width: 0;');
      // sideNav.setAttribute("style", "transform: translateX(-100%); width: 0;");
      // main.classList.remove("l9");
      this.hidden = true;
    } else {
      main.addClass('l9');
      sideNav.removeAttr('style');
      // sideNav.setAttribute("style", "transform: translateX(0%);");
      // main.classList.add("l9");
      this.hidden = false;
    }
    // console.log(event);
    // console.log(sideNav);
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
