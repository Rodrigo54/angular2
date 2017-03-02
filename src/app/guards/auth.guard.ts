import { Injectable } from '@angular/core';
import { CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs/Rx';

// import { AuthService } from '../auth.service';

@Injectable()
export class AuthGuard implements CanLoad {

  constructor(
    // private authService: AuthService,
    private router: Router
  ) { }

  canLoad(route: Route): Observable<boolean>|Promise<boolean>|boolean  {

    if (localStorage.getItem('token')) {
      return true;
    }else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
