import { Component } from '@angular/core';
import { LogoDashboardComponent } from "../../atomos/logo-dashboard/logo-dashboard.component";
import { FormInicioSesionComponent } from "../../atomos/form-inicio-sesion/form-inicio-sesion.component";
import { LogoMichiComponent } from "../../atomos/logo-michi/logo-michi.component";

@Component({
  selector: 'app-inicio-sesion',
  imports: [FormInicioSesionComponent, LogoMichiComponent],
  templateUrl: './inicio-sesion.component.html',
  styleUrl: './inicio-sesion.component.scss'
})
export class InicioSesionComponent {
  operacion: string = "Iniciar sesión"
}
