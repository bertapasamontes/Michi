import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../env/environment';
import { Observable } from 'rxjs';
import { Event } from '../../interfaces/event';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

   private myAppUrl: String;
  private myApiUrl: String; // URL del backend

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/calendar/';
  }
  
  // Método para obtener la lista de usuarios desde el backend
    getListEvents(): Observable<Event[]>{
      return this.http.get<Event[]>(`${this.myAppUrl}${this.myApiUrl}`);
    }
    deleteEvent(id:number): Observable<void>{
      return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`)
    }
  
    saveEvent(Event: Event): Observable<void>{
      return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, Event)
    }
  
    getEvent(id:number): Observable<Event>{
      return this.http.get<Event>(`${this.myAppUrl}${this.myApiUrl}${id}`)
    }
  
    updateEvent(id:number, Event: Event): Observable<void>{
      return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, Event);
    }
}
