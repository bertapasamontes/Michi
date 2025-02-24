import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/users.js';
import { environment } from '../../../env/environment.js';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private myAppUrl: String;
  private myApiUrl: String; // URL del backend

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/usuario/';
  }

  // Método para obtener la lista de usuarios desde el backend
  getListUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${this.myAppUrl}${this.myApiUrl}`);
  }
  deleteUser(id:number): Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  saveUser(user: User): Observable<void>{
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, user)
  }

  getUser(id:number): Observable<User>{
    return this.http.get<User>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  updateUser(id:number, user: User): Observable<void>{
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, user);
  }
}
