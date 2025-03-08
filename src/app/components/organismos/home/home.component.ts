import { Component, Signal } from '@angular/core';
import { UsersInAppComponent } from '../../users/users-in-app/users-in-app.component';
import { PlacesInAppComponent } from "../../places-in-app/places-in-app.component";
import { TablaDatosComponent } from "../../moleculas/tabla-datos/tabla-datos.component";
import { DataSignalService } from '../../../services/dataSignalService/data-signal.service';
import { BtnAddComponent } from "../../atomos/btn-add/btn-add.component";
import { UserService } from '../../../services/user/user.service';
import { MapGlobalService } from '../../../services/mapa/map-global.service';
import { ProductsService } from '../../../services/products/products.service';
// import { UsersInAppComponent } from 'users-in-app/user-in-app.component';

@Component({
    selector: 'app-home',
    // imports: [UsersInAppComponent, PlacesInAppComponent, TablaDatosComponent],
    imports: [TablaDatosComponent, BtnAddComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {

    constructor(
        private _dataSignalService: DataSignalService,
        private _userService: UserService,
        private _mapGlobal: MapGlobalService,
        private _productService: ProductsService
    ){
        console.log("total Paginas: ",this.totalPaginasSignal);
    }

    dataUsers : Signal<any[]> = this._dataSignalService.usuariosEnMichiSignal;
    dataPlaces: Signal<any[]> = this._dataSignalService.sitiosEnMichiSignal;
    dataProducts: Signal<any[]> = this._dataSignalService.productosSignal;



    productos$ = this._dataSignalService.productosSignal;  // Observable de productos
    totalProductos$ = this._dataSignalService.totalProductosSignal;  // Observable de total de productos
    totalPaginas$ = this._dataSignalService.totalPaginasSignal;  // Observable de total de páginas
    paginaActual$ = this._dataSignalService.paginaActualSignal;  // Observable de página actual


    // Paginación de productos
    paginaActual: number = 1;
    limit: number = 5;
    // totalProductos: number = 0;
    // totalPaginas: number = 0;
    
    refreshProducts(pagina:number) {
      this._dataSignalService.getListProductSignal(pagina,5);      
    }
    refreshUsers(){
        this._dataSignalService.getListUsersSignal();      
    }
    refreshPlaces(){
      this._dataSignalService.getListPlacesSignal();
    }
    
    deleteItem(event: { id: number; tipo: 'usuarios' | 'locales' | 'productos' }): void {
        if(event.tipo === 'usuarios'){
            this._userService.deleteUser(event.id).subscribe(()=>{
            });
            this.refreshUsers();
        }
        if(event.tipo === 'locales'){
            this._mapGlobal.deletePlace(event.id).subscribe(()=>{
            });
            this.refreshPlaces();
        }
        if(event.tipo === 'productos'){
            this._productService.deleteProduct(event.id).subscribe(()=>{
            });
            this.refreshProducts(this.paginaActual);
        }
        console.log("delete evento: ", event)
    }

    cambiarPagina(nuevaPagina: number): void {
        if (nuevaPagina >= 1 && nuevaPagina <= this.totalPaginasSignal) {
            this.paginaActual = nuevaPagina;
            this.refreshProducts(this.paginaActual);
        }
    }

     // Accediendo a los signals directamente en la plantilla
    get totalProductosSignal(): number {
        return this._dataSignalService.totalProductosSignal();  // Accede al valor del signal
    }

    get totalPaginasSignal(): number {
        return this._dataSignalService.totalPaginasSignal();  // Accede al valor del signal
    }
}
