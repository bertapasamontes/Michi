import { Component } from '@angular/core';
import { PlacesService } from '../../services/mapa/places/places-service.service';
import { MapViewComponent } from "./components/map-view/map-view.component";
import { ProgressBarComponent } from "../shared/progress-bar/progress-bar.component";
import { BtnMyLocationComponent } from "./components/btn-my-location/btn-my-location.component";
import { SearchBarComponent } from "./components/search-bar/search-bar.component";
import { MatIcon } from '@angular/material/icon';


@Component({
    selector: 'app-mapa',
    imports: [MapViewComponent, ProgressBarComponent, BtnMyLocationComponent, SearchBarComponent, MatIcon],
    templateUrl: './mapa.component.html',
    styleUrl: './mapa.component.scss'
})
export class MapaComponent {
    constructor(
        private _placesService: PlacesService
    ){}
    
    get isUserLocationReady(){
        return this._placesService.isUserLocationReady;
    }

    getLocation(){
        console.log("servicio places:",this._placesService.getUserLocation());
    }
}
