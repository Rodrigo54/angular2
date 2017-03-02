import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { ListaService } from './lista.service';

@Injectable()
export class DadosResolve implements Resolve<any> {

  constructor(private listaService: ListaService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<any>|Promise<any>|any {
      return this.listaService.getTotais();
  }
}
