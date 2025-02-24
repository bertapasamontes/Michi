import { Injectable } from '@angular/core';
import { LngLatBounds, LngLatLike, Map, Marker, Popup } from 'mapbox-gl';
import { Feature } from '../../../interfaces/places/placesRetrieve';
// import { Feature } from '../../../interfaces/places';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map!: Map;
  private marcadores: Marker[]=[];

  get isMapReady(){
    return !!this.map; //si tiene algun valor el map, devolverá true, si no, false.
  }

  setMap(map: Map){
    this.map = map; //establecemos que el valor de mi mapa es el mapa.
  }

  //mover el mapa a cualquier sitio de la pantalla desde nuestro servicio
  flyTo(coords: LngLatLike){ //recibe un objeto que tenga longitud y latitud
    if(!this.isMapReady){
      console.log('El mapa no está inicializado');
    }

    this.map?.flyTo({
      zoom: 14,
      center: coords
    })
  }

  createMarkersFromPlaces(places: Feature[], userLocation:[number, number]){
    if(!this.map) console.log('mapa no existe');
    this.marcadores.forEach(marker => marker.remove());

    const newMarkers=[];

    for(let sitio of places){
      const [long, lat] = sitio.geometry.coordinates;
      const nombreSitio = sitio.properties?.name ?? "Sin nombre";
      const direccion = sitio.properties?.context?.address?.name ?? "Dirección desconocida";
      const popUp = new Popup()
        .setHTML(`
          ´<h6>${nombreSitio}</h6>
          <span>${direccion}</span>
          `);
      const newMarker = new Marker()
          .setLngLat([long,lat])
          .setPopup(popUp)
          .addTo(this.map);
      
      newMarkers.push(newMarker);
    }
    this.marcadores = newMarkers;

    if(places.length === 0) return; //si no hay sitios no hace falta q se ejecuten las siguientes lineas.

    //hacer que la imagen del mapa recoja a todos los marcadores
    const bounds = new LngLatBounds();
    newMarkers.forEach(marker => bounds.extend(marker.getLngLat()));
    bounds.extend(userLocation);

    this.map.fitBounds(bounds,{
      padding: 100 //padding para que no se vean marcadores al ras del limite del mapa
    });
  }

}
