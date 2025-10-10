import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-ProfileSmallInfo',
  imports: [],
  templateUrl: './ProfileSmallInfo.component.html',
  styleUrl: './ProfileSmallInfo.component.scss'
})
export class ProfileSmallInfo {

  usuarioLogueado:any = null

  constructor(
    private _authService: AuthService,
    private _userService: UserService
  ){
    const user = this._authService.getUserFromToken();

    if(user && user.email) {
      console.log(user.email);

     _userService.getUserByEmail(user.email).subscribe((user)=>{
      this.usuarioLogueado = user
      console.log(Object.keys(this.usuarioLogueado))
      }); 
    }
    else {
      console.warn("No hay usuario en el token o el token ha expirado.Loc: profile-small-info")
    }
    

      
      
  }

 

}
