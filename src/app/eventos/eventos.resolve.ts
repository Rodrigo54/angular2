import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { EventosService } from './eventos.service';

@Injectable()
export class EventosResolve implements Resolve<any> {

  constructor(private eventosService: EventosService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<any>|Promise<any>|any {
      return this.eventosService.getLista();
  }
}
