import { Injectable, signal } from '@angular/core';
import { UserService } from '../user/user.service';
import { User } from '../../interfaces/users';
import { MapGlobalService } from '../mapa/map-global.service';
import { ProductsService } from '../products/products.service';

@Injectable({
  providedIn: 'root'
})
export class DataSignalService {

  constructor(
    private _userService: UserService,
    private _mapGlobalService: MapGlobalService,
    private _productService: ProductsService,
  ){
    this.getListUsersSignal();
    this.getListPlacesSignal();
    this.getListProductSignal();
  }

  usuariosEnMichiSignal = signal<any[]>([]);
  sitiosEnMichiSignal = signal<any[]>([]);
  productosSignal = signal<any[]>([]);


  getListUsersSignal(){
    try{
    this._userService.getListUsers().subscribe((data:User[])=>{
      this.usuariosEnMichiSignal.set(data);
    })
    }
    catch (error){
      console.log("error",error);
    }
  }
  getListPlacesSignal(){
    try{
      this._mapGlobalService.getListPlaces().subscribe((data)=>{
      this.sitiosEnMichiSignal.set(data);
    })
    }
    catch (error){
      console.log("error",error);
    }
  }
  getListProductSignal(){
    try{
      this._productService.getListProducts().subscribe((data)=>{
      console.log("productos:", data);
      this.productosSignal.set(data);
    })
    }
    catch (error){
      console.log("error",error);
    }
  }
}
