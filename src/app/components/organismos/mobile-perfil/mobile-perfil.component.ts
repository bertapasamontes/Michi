import { Component } from '@angular/core';
import { ProfileBigInfoComponent } from "../../atomos/profile-big-info/profile-big-info.component";
import { User } from '../../../interfaces/users';
import { AuthService } from '../../../services/auth/auth.service';
import { UserService } from '../../../services/user/user.service';
import { ProductoFavComponent } from "../../moleculas/producto-fav/producto-fav.component";

@Component({
  selector: 'app-mobile-perfil',
  imports: [ProfileBigInfoComponent, ProductoFavComponent],
  templateUrl: './mobile-perfil.component.html',
  styleUrl: './mobile-perfil.component.scss'
})
export class MobilePerfilComponent {
constructor(
    private _authService: AuthService,
    private _userService: UserService,
  ){}

  // usuarioLogueado:any;
  usuarioLogueado!:User;


  ngOnInit(){
    const user = this._authService.getUserFromToken();
    console.log(user.email);

    this._userService.getUserByEmail(user.email).subscribe((user)=>{
      try{
      this.usuarioLogueado = user;
      console.log("user como userLogueado welcome")
      }
      catch(error){
        console.log('error al asignar el user como el userloguedo')
      }
    });   
  }
}
