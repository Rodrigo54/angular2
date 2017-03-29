import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { UsuariosService } from './usuarios.service';

@Injectable()
export class UsuariosResolve implements Resolve<any> {

  constructor(private usuariosService: UsuariosService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<any>|Promise<any>|any {

      return this.usuariosService.getAll().toPromise().then(
        data => { return data },
        erro => { return erro }
      );
  }

}
