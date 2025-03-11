import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MobileNavbarComponent } from "../../shared/mobile-navbar/mobile-navbar.component";
// import { LoadingPageComponent } from "../../atomos/loading-page/loading-page.component";
import { MobileHeaderComponent } from "../../shared/mobile-header/mobile-header.component";

@Component({
  selector: 'app-user-layout',
  imports: [RouterOutlet, MobileNavbarComponent, MobileHeaderComponent],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.scss'
})
export class UserLayoutComponent {

  loading:boolean = false;
}
