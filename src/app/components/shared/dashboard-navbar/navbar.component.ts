import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LogoDashboardComponent } from '../../atomos/logo-dashboard/logo-dashboard.component';
import { LinkCerrarSesionComponent } from "../../atomos/link-cerrar-sesion/link-cerrar-sesion.component";

@Component({
    selector: 'app-navbar',
    imports: [RouterLink, MatIcon, RouterLinkActive, LogoDashboardComponent, LinkCerrarSesionComponent],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss'
})
export class navbarComponent {

}
