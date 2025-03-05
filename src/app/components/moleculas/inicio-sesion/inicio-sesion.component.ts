import { Component, Input } from '@angular/core';
import { LogoDashboardComponent } from "../../atomos/logo-dashboard/logo-dashboard.component";
import { FormInicioSesionComponent } from "../../atomos/form-inicio-sesion/form-inicio-sesion.component";
import { LogoMichiComponent } from "../../atomos/logo-michi/logo-michi.component";
import { UserService } from '../../../services/user/user.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FormRegistroComponent } from "../../atomos/form-registro/form-registro.component";
import { BtnLoginRegistroComponent } from "../../atomos/btn-login-registro/btn-login-registro.component";

@Component({
  selector: 'app-inicio-sesion',
  imports: [FormInicioSesionComponent, LogoMichiComponent, FormRegistroComponent, BtnLoginRegistroComponent],
  templateUrl: './inicio-sesion.component.html',
  styleUrl: './inicio-sesion.component.scss'
})
export class InicioSesionComponent {

  constructor(
    private _userService: UserService
  ){
  }

  operacionAlBoton:string = ''; //enviamos la operacion que debe realizar el boton

  operacion: string = "Iniciar sesión";

  loguearAlUser(credenciales: {email:string, password: string}){
    this._userService.login(credenciales.email, credenciales.password).subscribe(
  )}

  registrarAlUser(credenciales: { name: string,  username: string, email:string, password: string, role: string }){
    this._userService.register(credenciales).subscribe({
      next: (respuesta)=>{
        console.log("registro exitoso: ", respuesta);
        return this.loguearAlUser({email:credenciales.email, password: credenciales.password})

      },
      error:(error)=>{
        console.log("error: ", error)
      }
    }
      
    )
  } 

  ngOnInit(){
    console.log(this.operacion);
  }
  changeOperation(nuevaOperacion: string){
    this.operacion = nuevaOperacion;
  }

  reload(){
    console.log(this.operacion);
  }
}
