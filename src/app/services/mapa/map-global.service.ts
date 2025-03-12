import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../env/environment';
import { Observable } from 'rxjs';
import { placeGlobal } from '../../interfaces/places/placeGlobal';

@Injectable({
  providedIn: 'root'
})
export class MapGlobalService {

  private myAppUrl: String;
    private myApiUrl: String; // URL del backend
  
    constructor(private http: HttpClient) {
      this.myAppUrl = environment.endpoint;
      this.myApiUrl = 'api/map/';
    }
  
    // Método para obtener la lista de sitios desde el backend
    getListPlaces(): Observable<placeGlobal[]>{
      return this.http.get<placeGlobal[]>(`${this.myAppUrl}${this.myApiUrl}`);
    }
    deletePlace(id:string): Observable<void>{
      return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`)
    }
  
    savePlace(Place: placeGlobal): Observable<void>{
      return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, Place)
    }
  
    getPlace(id:string): Observable<placeGlobal>{
      return this.http.get<placeGlobal>(`${this.myAppUrl}${this.myApiUrl}${id}`)
    }
  
    updatePlace(id:string, sitio: placeGlobal): Observable<void>{
      return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, sitio);
    }
}
