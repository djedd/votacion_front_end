import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {

  constructor(private _router: Router,
    private authService: AuthService) { }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.checkLoggedIn();
  }

  checkLoggedIn(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    }
    this._router.navigate(['/login']);
    return false;
  }

}
