import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MobileNavbarComponent } from "../../shared/mobile-navbar/mobile-navbar.component";

@Component({
  selector: 'app-user-layout',
  imports: [RouterOutlet, MobileNavbarComponent],
  templateUrl: './user-layout.component.html',
  styleUrl: './user-layout.component.scss'
})
export class UserLayoutComponent {

}
