import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsuariosComponent } from './usuarios.component';
import { UsuariosResolve } from './usuarios.resolve';

const UsuariosRoutes: Routes = [
  { path: '', component: UsuariosComponent,
    data: { title: 'Usuarios' },
    resolve: { lista: UsuariosResolve }
  },
];

@NgModule({
    imports: [RouterModule.forChild(UsuariosRoutes)],
    exports: [RouterModule]
})
export class UsuariosRoutingModule {}
