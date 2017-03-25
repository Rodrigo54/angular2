import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';
declare var Materialize: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup;
  erro;

  constructor(
    fb: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {
    this.loginForm = fb.group({
      'email': ['',
        Validators.compose([
          Validators.required,
          Validators.email
        ])
      ],
      'senha': ['', Validators.required]
    });
  }

  submitForm(value: any): void {
    if (this.loginForm.valid) {
      this.auth.login(value).subscribe(
        dados => {
          this.auth.setToken(dados.token);
          this.auth.setUserData(dados);
          this.router.navigate(['/admin/dashboard']);
        },
        error =>  this.erro = error.message || 'Erro no Login'
      );
    }else {
      this.erro = 'Erro no Login';
    }
  }

  textError(campo){
    if (this.loginForm.controls[campo].hasError('required')){
      return campo + ' requerido';
    }
    if (this.loginForm.controls[campo].hasError('email')){
       return 'Email errado';
    }
  }

  hasError(campo): boolean {
    let classe;
    if ( this.erro || (this.loginForm.controls[campo].errors && this.loginForm.controls[campo].touched) ){
      classe = 'invalid';
    } else {
      classe = null;
    }
    return classe;
  }

}
