import { Component, Input } from '@angular/core';
import { User } from '../../../interfaces/users';
import { RouterLink } from '@angular/router';
import { LinkCerrarSesionComponent } from "../link-cerrar-sesion/link-cerrar-sesion.component";

@Component({
  selector: 'app-profile-big-info',
  imports: [RouterLink, LinkCerrarSesionComponent],
  templateUrl: './profile-big-info.component.html',
  styleUrl: './profile-big-info.component.scss'
})
export class ProfileBigInfoComponent {
  @Input() usuarioLogueado!: User;
}
