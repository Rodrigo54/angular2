import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{

  loginForm : FormGroup;

  erro = null;

  // We are passing an instance of the FormBuilder to our constructor
  constructor(
    fb: FormBuilder,
    private router: Router,
    private auth: AuthService
  ){
    // Here we are using the FormBuilder to build out our form.
    this.loginForm = fb.group({
      // We can set default values by passing in the corresponding value or leave blank if we wish to not set the value. For our example, we’ll default the gender to female.
      'email' : ['',
        Validators.compose([
          Validators.required,
          CustomValidators.email
        ])
      ],
      'senha': ['', Validators.required]
    })
  }

  submitForm(value: any):void{
    if(this.loginForm.valid) {
      this.auth.login(value)
        .subscribe(
          (dados) => {
            this.auth.setToken(dados.token);
            this.auth.setUserData(dados);
            this.router.navigate(['/dashboard'])
          },
          error =>  this.erro = error.message
        );
    }
    else{
      this.erro = 'Erro no Login';
    }
  }
}
