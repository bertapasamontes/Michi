import { Component, ElementRef, ViewChild, viewChild } from '@angular/core';
import { PlacesService } from '../../../../services/mapa/places/places-service.service';
import * as mapbox from 'mapbox-gl';
import { MapService } from '../../../../services/mapa/map/map.service';
import { MapGlobalService } from '../../../../services/mapa/map-global.service';
import { FiltroMapaComponent } from "../../../atomos/filtro-mapa/filtro-mapa.component";


@Component({
  selector: 'app-map-view',
  imports: [FiltroMapaComponent],
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.scss'
})
export class MapViewComponent {

  @ViewChild('mapDiv') mapDivElement!: ElementRef; //referencia al mapa
  map!: mapbox.Map; 

  sitiosPorCategoria:any = {}
  markers: mapbox.Marker[] = [];
  categoriasSeleccionadas: string[] = []; //categ q pilla el user
  categorias: string[] = [] //todas las categorias q hay


  constructor(
    private _placesService: PlacesService,
    private _mapService: MapService,
    private _mapGlobal: MapGlobalService
  ){}

  ngAfterViewInit(){
    if(!this._placesService.userLocation) console.log('no hay ubi del user');

    this.map = new mapbox.Map({
      container: this.mapDivElement.nativeElement, // elemento HTML donde quiero que renderice el mapa
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this._placesService.userLocation, // starting position [lng, lat] = centro del mapa = mi ubicación
      zoom: 14, // starting zoom
    });

    console.log(this.map);

    //pop up
    const popUp = new mapbox.Popup()
      .setHTML(`
        <h6>Aqui toy yo</h6>
        <span>Estoy aquiiii</span>
      `);
    
    //crear nuevo marcador
    new mapbox.Marker({ color: 'orange'})
      .setLngLat(this._placesService.userLocation!) //dónde aparece
      .setPopup(popUp) //colocamos el popUp
      .addTo(this.map) //lo añadimos al mapa

        
    //inicilizamos mapa, establecemos el servicio y ya tenemos acceso global a él.
      this._mapService.setMap(this.map);

      this.getListPlaces();
  }
  
  getListPlaces() {
    this._mapGlobal.getListPlaces().subscribe((data: any[])=>{ 
    data.forEach((sitio)=>{
      sitio.category.forEach((categoria: string) => {
        if(!this.sitiosPorCategoria[categoria]){
        this.sitiosPorCategoria[categoria] = [];
        }
        this.sitiosPorCategoria[categoria].push(sitio);
        
        //añadimos la categoria a la lista de categorias
        if (!this.categorias.includes(categoria)) {
          this.categorias.push(categoria);
        }
      });
    });
    this.categorias = Object.keys(this.sitiosPorCategoria)
    this.categoriasSeleccionadas = [...this.categorias];

    this.filtrarSitios();
    // this.crearMarcadorPorSitio();
  });
  }

  crearMarcadorPorSitio(sitio:any){
    return new mapbox.Marker(
      { 
        color: 'red',

      })
      .setLngLat(sitio.coordinates) //dónde aparece
      .setPopup(
        new mapbox.Popup()
        .setHTML(`
          <h6>${sitio.name}</h6>
          <span>${sitio.direction  || 'Sin dirección'}</span>
          <span>${sitio.category  || 'Sin categoria'}</span>
        `)
      ) //colocamos el popUp
      .addTo(this.map) //lo añadimos al mapa
  }


  filtrarSitios() {
    this.markers.forEach(marker => marker.remove()); // eliminamos los marcadores anteriores
    this.markers = []; // reiniciamos el array de marcadores a 0

    Object.entries(this.sitiosPorCategoria).forEach(([categoria, sitios]) => {
      const sitiosArray = sitios as any[];
      if (this.categoriasSeleccionadas.includes(categoria)) {// si hay alguna, se muestran las seleccionadas
        sitiosArray.forEach((sitio) => {

          const marker = this.crearMarcadorPorSitio(sitio);

          this.markers.push(marker); // guardamos marcador para poder eliminarlo luego
        });
      }
      if(this.categoriasSeleccionadas.length === 0){
        return
      }
    });
  }

  // toggleCategoria(categoria: string) {
  //   if (this.categoriasSeleccionadas.includes(categoria)) {
  //     this.categoriasSeleccionadas = this.categoriasSeleccionadas.filter(cat => cat !== categoria);
  //   } else {
  //     this.categoriasSeleccionadas.push(categoria);
  //   }
  //   this.filtrarSitios(); // aplicamos filtro
  // }  

  actualizarFiltro(nuevasCategorias: string[]) {
    this.categoriasSeleccionadas = nuevasCategorias;
    this.filtrarSitios();
  }
}
