import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MapService } from '../../../services/mapa/map/map.service';
import { PlacesService } from '../../../services/mapa/places/places-service.service';

@Component({
  selector: 'app-btn-my-location',
  imports: [MatIcon],
  templateUrl: './btn-my-location.component.html',
  styleUrl: './btn-my-location.component.scss'
})
export class BtnMyLocationComponent {

  constructor(
    private _mapService: MapService,
    private _placesService: PlacesService
  ){}

  goToMyLocation(){
    console.log('ir a mi ubi');
    if(!this._placesService.userLocation){
      console.log('no hay ubi de user');
    }
    if(!this._mapService.isMapReady){
      console.log('no hay mapa disponible');
    }

    this._mapService.flyTo(this._placesService.userLocation!)
  }
}
