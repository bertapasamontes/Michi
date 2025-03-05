import { Component } from '@angular/core';
import { LogoDashboardComponent } from "../../atomos/logo-dashboard/logo-dashboard.component";
import { FormInicioSesionComponent } from "../../atomos/form-inicio-sesion/form-inicio-sesion.component";
import { LogoMichiComponent } from "../../atomos/logo-michi/logo-michi.component";
import { UserService } from '../../../services/user/user.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormRegistroComponent } from "../../atomos/form-registro/form-registro.component";

@Component({
  selector: 'app-inicio-sesion',
  imports: [FormInicioSesionComponent, LogoMichiComponent, RouterLink, FormRegistroComponent],
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

  registrarAlUser(credenciales: { name: string,  username: string, email:string, password: string, role: string }){
    this._userService.saveUser(credenciales).subscribe(
    )
  } 
}
