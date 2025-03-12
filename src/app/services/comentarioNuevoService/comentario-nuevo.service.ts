import { Injectable } from '@angular/core';
import { environment } from '../../../env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comentario } from '../../interfaces/comments';

@Injectable({
  providedIn: 'root'
})
export class ComentarioNuevoService {

  private myAppUrl: String;
  private myApiUrl: String; // URL del backend

  constructor(
    private http: HttpClient
  ) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/comentario/';
  }

  // Método para obtener la lista de sitios desde el backend

  getListComentarios(): Observable<Comentario[]>{
    return this.http.get<Comentario[]>(`${this.myAppUrl}${this.myApiUrl}all`);
  }

  deleteComentario(id:number): Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  saveComentario(Comentario: Comentario): Observable<void>{
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}${Comentario.product}`, Comentario)
  }

  getComentario(id:string): Observable<Comentario>{
    return this.http.get<Comentario>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  updateComentario(id:string, sitio: Comentario): Observable<void>{
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, sitio);
  }
}
