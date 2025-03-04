import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { inject } from '@angular/core';



export const AuthGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  const _authService = inject(AuthService);
  const router = inject(Router);
  
  if (_authService.isLogged()) { 
   console.log("estas logueado")
   console.log(_authService.isLogged());
    return true;
  }
  else{
    console.log("No estás logueado");// si no está logueado, vuelve al login.
    router.navigate(["/login"]);
    return false;
  }
   

};
