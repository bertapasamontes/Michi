import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean => {

  const router = inject(Router);
  const token =  localStorage.getItem('tokenDelUser');
  const rol = localStorage.getItem('role');

  const rolEsperado = route.data['rolEsperado'];

  // 🔥 Si el usuario es admin, puede acceder a todo
  if (rol === 'admin') {
    return true;
  }

  // 🔥 Si el usuario es 'viewer' y la ruta espera 'viewer', lo deja pasar
  if (rol === rolEsperado) {
    return true;
  }

  // ❌ Si no tiene permiso, lo manda a login
  console.log(`RoleGuard: Acceso denegado para ${rol}, se esperaba ${rolEsperado}`);
  router.navigate(['/login']);
  return false;
  
  return true;
};
