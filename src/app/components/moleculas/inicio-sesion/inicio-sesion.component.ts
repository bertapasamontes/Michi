import { Component } from '@angular/core';
import { LogoDashboardComponent } from "../../atomos/logo-dashboard/logo-dashboard.component";
import { FormInicioSesionComponent } from "../../atomos/form-inicio-sesion/form-inicio-sesion.component";
import { LogoMichiComponent } from "../../atomos/logo-michi/logo-michi.component";
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-inicio-sesion',
  imports: [FormInicioSesionComponent, LogoMichiComponent],
  templateUrl: './inicio-sesion.component.html',
  styleUrl: './inicio-sesion.component.scss'
})
export class InicioSesionComponent {

  constructor(
    private _userService: UserService
  ){
  }

  operacion: string = "Iniciar sesión";

  loguearAlUser(credenciales: {email:string, password: string}){
    this._userService.login(credenciales.email, credenciales.password).subscribe(
  )}
}
