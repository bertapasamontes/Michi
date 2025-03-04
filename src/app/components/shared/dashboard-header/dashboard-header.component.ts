import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-dashboard-header',
  imports: [],
  templateUrl: './dashboard-header.component.html',
  styleUrl: './dashboard-header.component.scss'
})
export class DashboardHeaderComponent {

  usuarioLogueado:any = null

  constructor(
    private _authService: AuthService,
    private _userService: UserService
  ){
    const user = this._authService.getUserFromToken();
    console.log(user.email);

     _userService.getUserByEmail(user.email).subscribe((user)=>{
      // console.log("user desde dashboard: ", user)
      this.usuarioLogueado = user
      console.log(Object.keys(this.usuarioLogueado))

      
    });   
  }

 

}
