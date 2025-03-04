import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLogged(): boolean{
    localStorage.getItem('tokenDelUser');
    localStorage.getItem('role');

    if(localStorage.getItem('tokenDelUser') != null || localStorage.getItem('role') != null){
      return true;
    }
    else return false    
  }

  logOut(): void{
    localStorage.removeItem('tokenDelUser');
    localStorage.removeItem('role');
  }
}
