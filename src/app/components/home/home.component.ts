import { Component } from '@angular/core';
import { UsersInAppComponent } from '../users-in-app/users-in-app.component';
import { PlacesInAppComponent } from "../places-in-app/places-in-app.component";
// import { UsersInAppComponent } from 'users-in-app/user-in-app.component';

@Component({
    selector: 'app-home',
    imports: [UsersInAppComponent, PlacesInAppComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {

}
