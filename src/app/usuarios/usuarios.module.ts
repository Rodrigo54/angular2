import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterializeModule } from 'ng2-materialize';

import { UsuariosRoutingModule } from './usuarios.routing.module';
import { UsuariosComponent } from './usuarios.component';
import { UsuariosTabelaComponent } from './usuarios-tabela.component';
import { UsuariosResolve } from './usuarios.resolve';
import { UsuariosService } from './usuarios.service';

@NgModule({
  imports: [
    CommonModule,
    MaterializeModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    UsuariosRoutingModule
  ],
  declarations: [
    UsuariosComponent,
    UsuariosTabelaComponent
  ],
  providers:[
    UsuariosService,
    UsuariosResolve
  ]
})
export class UsuariosModule { }
