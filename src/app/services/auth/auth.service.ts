import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLogged(): boolean{
    localStorage.getItem('tokenDelUser');
    localStorage.getItem('role');

    if(localStorage.getItem('tokenDelUser') != null && localStorage.getItem('role') != null){
      return true;
    }
    else return false    
  }

  logOut(): void{
    localStorage.removeItem('tokenDelUser');
    localStorage.removeItem('role');
  }

  getToken(): string | null {
    return localStorage.getItem('tokenDelUser');
  }

  getUserFromToken(): any {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica el payload
      return payload; // Devuelve los datos del usuario
    } catch (error) {
      console.error("Error decodificando el token:", error);
      return null;
    }
  }
}
