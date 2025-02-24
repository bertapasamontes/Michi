import { Component } from '@angular/core';
import { PlacesService } from '../../../../services/mapa/places/places-service.service';
// import { Feature } from '../../../../interfaces/places';
import { MapService } from '../../../../services/mapa/map/map.service';
import { NgClass } from '@angular/common';
import { Feature } from '../../../../interfaces/places/placesRetrieve';

//añadir sitio a mongo
import { MapGlobalService } from '../../../../services/mapa/map-global.service';
import { placeGlobal } from '../../../../interfaces/places/placeGlobal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-search-results',
  imports: [NgClass],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss'
})
export class SearchResultsComponent {

  selectedId?: string = "";

  constructor(
    private _placesService: PlacesService,
    private _mapService: MapService,
    private _mapGlobal: MapGlobalService,
    private toastr: ToastrService
    
  ){
   
  } 
  // public places:Feature[] = this._placesService.places;
  
  get isLoadingPlaces(): boolean{
    return this._placesService.isLoadingPlaces;
  }

  get places(): Feature[]{
    return this._placesService.places;
  }

  flyTo(place: Feature){
    this.selectedId=place.properties.mapbox_id;


    const [long, lat] = place.geometry.coordinates;
    this._mapService.flyTo([long, lat]);
  }

  addPlace(sitio:Feature){
    const nuevoSitio: placeGlobal={
      name: sitio.properties?.name ?? "Nombre no disponible",
      mapbox_id: sitio.properties?.mapbox_id ?? "Mapbox_id no disponible",
      direction: sitio.properties?.context?.address?.name ?? "Dirección no disponible",
      short_direction: sitio.properties?.context?.address?.name ?? "Dirección corta no disponible",
      coordinates:sitio.geometry.coordinates,
      category: sitio.properties.poi_category ??"Categoría no especificada",
    }

    console.log('sitio guardado');
    console.log(nuevoSitio);
    //añadir nuevo sitio
    this._mapGlobal.savePlace(nuevoSitio).subscribe(()=>{
      this.toastr.success(`${nuevoSitio.name} añadido exitosamente a la base de datos`, 'Sitio nuevo')
    })
  }
}
