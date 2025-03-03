import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLogged(): boolean{
    localStorage.getItem('tokenDelUser');
    // console.log("autorizado")
    return true;
  }

  logOut(): void{
    localStorage.removeItem('tokenDelUser');
  }
}
