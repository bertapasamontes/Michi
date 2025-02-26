import { Component, Signal } from '@angular/core';
import { UsersInAppComponent } from '../../users/users-in-app/users-in-app.component';
import { PlacesInAppComponent } from "../../places-in-app/places-in-app.component";
import { TablaDatosComponent } from "../../moleculas/tabla-datos/tabla-datos.component";
import { DataSignalService } from '../../../services/dataSignalService/data-signal.service';
import { BtnAddComponent } from "../../atomos/btn-add/btn-add.component";
import { UserService } from '../../../services/user/user.service';
import { MapGlobalService } from '../../../services/mapa/map-global.service';
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
        private _dataSignalService: DataSignalService,
        private _userService: UserService,
        private _mapGlobal: MapGlobalService
    ){

    }

    tipo = 'users'

    dataUsers : Signal<any[]> = this._dataSignalService.usuariosEnMichiSignal;
    dataPlaces = this._dataSignalService.sitiosEnMichiSignal;
    
    refreshData() {
      this._dataSignalService.usuariosEnMichiSignal;
      location.reload();
    }
    
    deleteItem(event: { id: number; tipo: 'usuarios' | 'locales' }): void {
        if(event.tipo === 'usuarios'){
            this._userService.deleteUser(event.id).subscribe(()=>{
                // this.dataUsers = this._dataSignalService.getListUsersSignal;
                console.log('eliminado')
            })
        }
        if(event.tipo === 'locales'){
            this._mapGlobal.deletePlace(event.id).subscribe(()=>{
                // this.dataPlaces = this._dataSignalService.getListPlacesSignal;
            })
        }
        console.log("delete evento: ", event)
    }
}
