import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../../env/environment';
import { Product } from '../../interfaces/product';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private myAppUrl: String;
  private myApiUrl: String; // URL del backend

  constructor(
    private http: HttpClient
  ) {
    this.myAppUrl = environment.endpoint;
    this.myApiUrl = 'api/producto/';
  }

  // Método para obtener la lista de sitios desde el backend
  // getListProducts(): Observable<Product[]>{
  //   return this.http.get<Product[]>(`${this.myAppUrl}${this.myApiUrl}`);
  // }
  getListProducts(page: number, limit: number): Observable<{ data: Product[], total: number, totalPages: number }> {
    return this.http.get<{ data: Product[], total: number, totalPages: number }>(
      `${this.myAppUrl}${this.myApiUrl}?page=${page}&limit=${limit}`
    );
  }
  deleteProduct(id:number): Observable<void>{
    return this.http.delete<void>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  saveProduct(Product: Product): Observable<void>{
    return this.http.post<void>(`${this.myAppUrl}${this.myApiUrl}`, Product)
  }

  getProduct(id:number): Observable<Product>{
    return this.http.get<Product>(`${this.myAppUrl}${this.myApiUrl}${id}`)
  }

  updateProduct(id:number, sitio: Product): Observable<void>{
    return this.http.put<void>(`${this.myAppUrl}${this.myApiUrl}${id}`, sitio);
  }
}
