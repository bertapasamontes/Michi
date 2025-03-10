import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterModule } from '@angular/router';
import { BtnDescubrirComponent } from "../../atomos/btn-descubrir/btn-descubrir.component";
import { BtnMapaComponent } from "../../atomos/btn-mapa/btn-mapa.component";
import { BtnMichiBotComponent } from '../../atomos/btn-michi-bot/btn-michi-bot.component';
import { BtnPerfilComponent } from "../../atomos/btn-perfil/btn-perfil.component";

@Component({
  selector: 'app-mobile-navbar',
  imports: [RouterLink, RouterLinkActive, BtnDescubrirComponent, BtnMapaComponent, BtnMichiBotComponent, BtnPerfilComponent],
  templateUrl: './mobile-navbar.component.html',
  styleUrl: './mobile-navbar.component.scss'
})
export class MobileNavbarComponent {

}
