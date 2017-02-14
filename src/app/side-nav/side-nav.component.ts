import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

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
    let text = arrow.getElementsByClassName("right")["0"].innerHTML;
    if(text == "keyboard_arrow_right") {
      arrow.getElementsByClassName("right")["0"].innerHTML = "keyboard_arrow_down";
    }
    else{
      arrow.getElementsByClassName("right")["0"].innerHTML = "keyboard_arrow_right";
    }
  }
}
