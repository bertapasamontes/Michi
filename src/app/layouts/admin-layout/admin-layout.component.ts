import { Component } from '@angular/core';
import { navbarComponent } from "../../components/shared/dashboard-navbar/navbar.component";
import { RouterOutlet } from '@angular/router';
import { DashboardHeaderComponent } from "../../components/shared/dashboard-header/dashboard-header.component";

@Component({
  selector: 'app-admin-layout',
  imports: [navbarComponent, RouterOutlet, DashboardHeaderComponent],
  templateUrl: './admin-layout.component.html',
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {

}
