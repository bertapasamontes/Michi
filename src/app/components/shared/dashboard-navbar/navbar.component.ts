import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LogoDashboardComponent } from '../../atomos/logo-dashboard/logo-dashboard.component';

@Component({
    selector: 'app-navbar',
    imports: [RouterLink, MatIcon, RouterLinkActive, LogoDashboardComponent],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss'
})
export class navbarComponent {

}
