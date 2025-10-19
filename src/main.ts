import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';


//mapa NO TOCAR!!
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import { environment } from './env/environment';
mapboxgl.accessToken = environment.mapBoxToken;

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

  if(!navigator.geolocation){
    alert('Tu dispositivo no tiene geolocalización');
    console.log('Tu dispositivo no tiene geolocalización');
  }
