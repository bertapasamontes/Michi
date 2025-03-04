import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  const _authService = inject(AuthService);
  const router = inject(Router);

  const rol = localStorage.getItem('role');
  const rolEsperado = route.data['rolEsperado'];
  
  if (_authService.isLogged()) { 
    console.log("estas logueado")
    console.log(_authService.isLogged());

    console.log("rol: ",rol);
    console.log("rol esperad: ",rolEsperado);
    console.log("🔹 Redirigiendo a: ", state.url);
    console.log("🛑 Intentando acceder a la ruta:", route.url);

     // 🔥 Si el usuario es admin, puede acceder a todo
    if (rol === rolEsperado) {
      console.log("tienes el rol correcto")
      return true;
    }
    else {
      console.log(`RoleGuard: Acceso denegado para ${rol}, se esperaba ${rolEsperado}`);
      router.navigate(['/login']);
      return false
    }
  }
  else{
    console.log("No estás logueado");// si no está logueado, vuelve al login.
    router.navigate(["/login"]);
    return false;
  }
   

};
