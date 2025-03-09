import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../../interfaces/users.js';
import { environment } from '../../../env/environment.js';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private myAppUrl: String;
  private myApiUrl: String; // URL del backend

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/usuario/';
  }

  // Método para obtener la lista de usuarios desde el backend
  // getListUsers(): Observable<User[]>{
  //   return this.http.get<User[]>(`${this.myAppUrl}${this.myApiUrl}`);
  // }
  getListUsers(page: number, limit: number): Observable<{ data: User[], total: number, totalPages: number }> {
    return this.http.get<{ data: User[], total: number, totalPages: number }>(
      `${this.myAppUrl}${this.myApiUrl}?page=${page}&limit=${limit}`
    );
  }
  deleteUser(id:number): Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  saveUser(user: User): Observable<void>{
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, user)
  }

  getUser(id:number): Observable<User>{
    return this.http.get<User>(`${this.myAppUrl}${this.myApiUrl}/id/${id}`)
  }

  getUserByEmail(email: string): Observable<User>{
    return this.http.get<User>(`${this.myAppUrl}${this.myApiUrl}/email/${email}`)
  }

  register(user: User): Observable<any>{
    return this.http.post<any>(`${this.myAppUrl}${this.myApiUrl}`, user);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>( // el {} determina qué tipos de datos le entran
      `${this.myAppUrl}${this.myApiUrl}/login`,
      { email, password } // envia los datos en el body
    ).pipe(
      tap(respuesta =>{
        if(respuesta.tokenDelUser){ //guardamos el token y el rol del user en el localStorage
          localStorage.setItem("tokenDelUser",respuesta.tokenDelUser);
          localStorage.setItem("role",respuesta.usuario.role);
          console.log("rol desde userService login(): ",localStorage.getItem('role'))

          if(respuesta.usuario.role == 'admin'){
            this.router.navigate(['admin/data']);
          } 
          if(respuesta.usuario.role == 'viewer'){
            this.router.navigate(['user/descubrir'])
          }
        }
      })
    )
  }

  updateUser(id:number, user: User): Observable<void>{
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, user);
  }
}
