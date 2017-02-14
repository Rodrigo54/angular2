import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit() {
  }

  sair(){
    this.auth.logout().subscribe(
        (dados) => {
          this.auth.deleteToken();
          this.router.navigate(['/login'])
          console.log(dados.message);
        }
      )
    console.log('saindo');
  }
}
