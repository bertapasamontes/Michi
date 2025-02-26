import { Injectable, signal } from '@angular/core';
import { UserService } from '../user/user.service';
import { User } from '../../interfaces/users';
import { MapGlobalService } from '../mapa/map-global.service';

@Injectable({
  providedIn: 'root'
})
export class DataSignalService {

  constructor(
    private _userService: UserService,
    private _mapGlobalService: MapGlobalService,
  ){
    this.getListUsersSignal();
    this.getListPlacesSignal();
  }

  usuariosEnMichiSignal = signal<any[]>([]);
  sitiosEnMichiSignal = signal<any[]>([]);


  getListUsersSignal(){
    try{
    this._userService.getListUsers().subscribe((data:User[])=>{
      console.log("users:", data);
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
      console.log("users:", data);
      this.sitiosEnMichiSignal.set(data);
    })
    }
    catch (error){
      console.log("error",error);
    }
  }
}
