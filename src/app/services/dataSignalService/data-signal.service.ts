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
    this.getListUsersSignal(1,5);
    this.getListPlacesSignal();
    this.getListProductSignal(1,5);
  }

  usuariosEnMichiSignal = signal<any[]>([]);
  sitiosEnMichiSignal = signal<any[]>([]);
  productosSignal = signal<any[]>([]);

  totalProductosSignal = signal<number>(0);  // Guardar el total de productos
  totalUsersSignal = signal<number>(0); 

  totalPaginasSignal = signal<number>(0);    // Guardar el total de páginas
  paginaActualSignal = signal<number>(1);


  // getListUsersSignal(){
  //   try{
  //   this._userService.getListUsers().subscribe((data:User[])=>{
  //     this.usuariosEnMichiSignal.set(data);
  //   })
  //   }
  //   catch (error){
  //     console.log("error",error);
  //   }
  // }

  getListUsersSignal(page: number, limit: number){
    try{
    this._userService.getListUsers(page, limit).subscribe((data)=>{
      this.usuariosEnMichiSignal.set(data.data);

      this.totalUsersSignal.set(data.total);  // Total de productos
      this.totalPaginasSignal.set(data.totalPages);  // Total de páginas
      console.log("total pages signal actulizado 1: ",this.totalPaginasSignal());
      this.paginaActualSignal.set(page);  // Página actual
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
  // Obtener productos con paginación
  getListProductSignal(page: number, limit: number) {
    try {
      this._productService.getListProducts(page, limit).subscribe((data) => {
        console.log('productos:', data);

        // Actualizar las señales de productos, total de productos y total de páginas
        this.productosSignal.set(data.data);  // Productos actuales de la página
        this.totalProductosSignal.set(data.total);  // Total de productos
        this.totalPaginasSignal.set(data.totalPages);  // Total de páginas
        console.log("total pages signal actulizado 1: ",this.totalPaginasSignal());
        this.paginaActualSignal.set(page);  // Página actual
      });
    } catch (error) {
      console.log('error', error);
    }    
  }
}
