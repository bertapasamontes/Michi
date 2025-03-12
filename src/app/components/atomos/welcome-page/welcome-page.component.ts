import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { UserService } from '../../../services/user/user.service';
import { User } from '../../../interfaces/users';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-welcome-page',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss'
})
export class WelcomePageComponent {
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
