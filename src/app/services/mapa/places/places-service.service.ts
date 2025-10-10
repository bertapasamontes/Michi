import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { Feature, PlacesResponse } from '../../../interfaces/places';
import { MapService } from '../map/map.service';
import { environment } from '../../../../env/environment';
import { Suggestion, SuggestResponse } from '../../../interfaces/places/placesSuggestion';
import { Feature, Features } from '../../../interfaces/places/placesRetrieve';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  userLocation?: [number, number];
  isLoadingPlaces: boolean=false;
  places: Feature[] = []; //feature en mapbox = los sitios.

  get isUserLocationReady(): boolean{
    return !!this.userLocation;
  }

  constructor(
    private http: HttpClient,
    private _mapService: MapService
  ) {
    this.loadUserLocation(); 

  }


  private async loadUserLocation() {
    this.userLocation = await this.getUserLocation();
  }

  public async getUserLocation(): Promise<[number,number]>{
    return new Promise((resolve, reject)=>{
      navigator.geolocation.getCurrentPosition( args =>{ 
        this.userLocation = [args.coords.longitude, args.coords.latitude];
        resolve(this.userLocation);
      },
      (error)=>{
        alert('No se ha podido obtener la geolocalización');
        console.log(error);
        reject();
      }
    )
    })
  }

  
  mapbox_id: string = '';

  async getPlacesByQuery( query:string){
    if(query.length == 0){
      this.isLoadingPlaces = false;
      this.places=[];
      return
    }
    this.isLoadingPlaces = true;

    try {
      const places = await this.mapaConnection(query);
      this.isLoadingPlaces = false;

      this.places = places;

      if (!this.places || this.places.length === 0) {
        console.warn("No hay lugares disponibles para crear marcadores.");
        return;
      }
      this._mapService.createMarkersFromPlaces(this.places, this.userLocation!);
    } catch (error) {
      console.error("Error en getPlacesByQuery:", error);
      this.isLoadingPlaces = false;
    }

  }

  private async mapaConnection(query: string): Promise<Feature[]> {
    try {
      const suggestResponse$ = this.http.get<SuggestResponse>(
        `https://api.mapbox.com/search/searchbox/v1/suggest?q=${query}&language=es&country=es&proximity=${this.userLocation?.[0]}%2C${this.userLocation?.[1]}&session_token=123&access_token=${environment.mapBoxToken}`
      );

      const suggestResponse = await lastValueFrom(suggestResponse$);
  
      if (!suggestResponse?.suggestions?.length) return [];
  
      // 🔹 Obtener todos los mapbox_id de las sugerencias
      const mapboxIds = suggestResponse.suggestions.map(s => s.mapbox_id);
  
      // 🔹 Hacer múltiples solicitudes a retrieve usando Promise.all
      const retrieveResponses = await Promise.all(
        mapboxIds.map(id =>
          lastValueFrom(this.http.get<Features>(
            `https://api.mapbox.com/search/searchbox/v1/retrieve/${id}?language=es&session_token=123&access_token=${environment.mapBoxToken}`
          ))
        )
      );
  
      // 🔹 Unir todos los resultados en un solo array
      return retrieveResponses.flatMap(response => response?.features ?? []);
      
    } catch (error) {
      console.error("Error en mapaConnection:", error);
      return [];
    }
  }
  
}
