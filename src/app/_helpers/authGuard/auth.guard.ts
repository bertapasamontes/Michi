import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { inject } from '@angular/core';



export const AuthGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  const _authService = inject(AuthService);
  const router = inject(Router);
  
  if (!_authService.isLogged()) { // si no está logueado, vuelve al login.
    console.log("No estás logueado");
    router.navigate(["/login"]);
    return false;
  }
  console.log("estas logueado")
  return true;

};
