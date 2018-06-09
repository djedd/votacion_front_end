import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MandatoGuardService implements CanActivate {

  constructor(private _router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const id = +route.url[2].path;
    if (isNaN(id) || id < 1) {
      alert('Id de mandato no valido');
      this._router.navigate(['main/admin']);
      return false;
    }
    return true;
  }
}
