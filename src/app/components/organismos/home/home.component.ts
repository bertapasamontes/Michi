import { Component, Signal } from '@angular/core';
// import { UsersInAppComponent } from '../../users/users-in-app/users-in-app.component';
import { PlacesInAppComponent } from "../../places-in-app/places-in-app.component";
import { TablaDatosComponent } from "../../moleculas/tabla-datos/tabla-datos.component";
import { DataSignalService } from '../../../services/dataSignalService/data-signal.service';
import { BtnAddComponent } from "../../atomos/btn-add/btn-add.component";
import { UserService } from '../../../services/user/user.service';
import { MapGlobalService } from '../../../services/mapa/map-global.service';
import { ProductsService } from '../../../services/products/products.service';
import { MatIcon } from '@angular/material/icon';
import { PaginacionDatosComponent } from "../../atomos/paginacion-datos/paginacion-datos.component";


@Component({
    selector: 'app-home',
    imports: [TablaDatosComponent, BtnAddComponent, PaginacionDatosComponent],
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
        // console.log("total Paginas: ",);

        // Ejemplo de inicialización en el servicio
    this._dataSignalService.paginacionSignal.usuarios.totalPaginas.set(0);  // Asegurarse de que no sea undefined
    this._dataSignalService.paginacionSignal.usuarios.paginaActual.set(1);  // Asegurarse de que no sea undefined


    
    }

    ngAfterViewInit(){
        // console.log("total pages users",this.getTotalPagesSignal('usuarios'));
    }

    tipo!:  'usuarios' | 'locales' | 'productos';

    dataUsers : Signal<any[]> = this._dataSignalService.usuariosEnMichiSignal;
    dataPlaces: Signal<any[]> = this._dataSignalService.sitiosEnMichiSignal;
    dataProducts: Signal<any[]> = this._dataSignalService.productosSignal;


    


    //obtener la cantidad de paginas segun el tipo de datos:
    getTotalPagesSignal(tipo: 'usuarios' | 'locales' | 'productos'){
        const totalPaginas2 = this._dataSignalService.paginacionSignal[tipo].totalPaginas();

        if(!totalPaginas2){
            console.error("no hay totalPaginas2 en getTotalPagesSignal()");

            return 1;
        }
        return totalPaginas2;
    }

    //obtener la pagina actual segun el tipo de datos:
    getPaginaActualSignal(tipo: 'usuarios' | 'locales' | 'productos'){
        const paginaActual =  this._dataSignalService.paginacionSignal[tipo];

        if(!paginaActual){
            console.error("no hay paginación");
            return 1;
        }
        return paginaActual.paginaActual();
    }


    // Paginación de productos
    paginaActual: number = 1;
    limit: number = 5;
    
    
    refreshProducts(pagina:number) {
      this._dataSignalService.getListProductSignal(pagina,5);      
    }
    refreshUsers(pagina:number){
        this._dataSignalService.getListUsersSignal(pagina,5);      
    }
    refreshPlaces(){
      this._dataSignalService.getListPlacesSignal();
    }
    
    deleteItem(event: { id: number; tipo: 'usuarios' | 'locales' | 'productos' }): void {
        if(event.tipo === 'usuarios'){
            this._userService.deleteUser(event.id).subscribe(()=>{
            });
            
        }
        if(event.tipo === 'locales'){
            this._mapGlobal.deletePlace(event.id).subscribe(()=>{
            });
        }
        if(event.tipo === 'productos'){
            this._productService.deleteProduct(event.id).subscribe(()=>{
            });
        }
        this.refreshUsers(this.getPaginaActualSignal(event.tipo));
        console.log("delete evento: ", event)
    }

    cambiarPagina(pagina: number, tipo: 'usuarios' | 'locales' | 'productos'): void {

        console.log("total pages users: ",this.getTotalPagesSignal(tipo))

        if (pagina >= 1 && pagina <= this.getTotalPagesSignal(tipo)) {
            this._dataSignalService.paginacionSignal[tipo].paginaActual.set(pagina);

            

            switch(tipo){
                case 'usuarios':
                    this._dataSignalService.getListUsersSignal(pagina, 5);
                    break;
                // case 'locales':
                //     this._dataSignalService.getListPlacesSignal(pagina, 5);
                case 'productos':
                    this._dataSignalService.getListProductSignal(pagina, 5);
                    break;
            }
        }
    }
}
