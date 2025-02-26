import { Component } from '@angular/core';
import { UsersInAppComponent } from '../../users/users-in-app/users-in-app.component';
import { PlacesInAppComponent } from "../../places-in-app/places-in-app.component";
import { TablaDatosComponent } from "../../moleculas/tabla-datos/tabla-datos.component";
import { DataSignalService } from '../../../services/dataSignalService/data-signal.service';
import { BtnAddComponent } from "../../atomos/btn-add/btn-add.component";
// import { UsersInAppComponent } from 'users-in-app/user-in-app.component';

@Component({
    selector: 'app-home',
    // imports: [UsersInAppComponent, PlacesInAppComponent, TablaDatosComponent],
    imports: [TablaDatosComponent, BtnAddComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {
    constructor(
        private _dataSignalService: DataSignalService
    ){

    }

    tipo = 'users'

    dataUsers = this._dataSignalService.usuariosEnMichiSignal;
    dataPlaces = this._dataSignalService.sitiosEnMichiSignal;
    ngOnInit(){
    console.log("🏠 HomeComponent montado. Llamando a getListUsers()...");
    }
}
