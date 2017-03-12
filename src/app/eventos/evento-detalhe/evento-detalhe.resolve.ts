import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { EventosService } from '../eventos.service';

@Injectable()
export class EventoDetalheResolve implements Resolve<any> {

  constructor(private eventosService: EventosService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<any>|Promise<any>|any {
      const id = route.params['id'];
      return this.eventosService.getEvento(id).toPromise().then(
        data => { return data },
        erro => { return erro }
      );
  }

}
