import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, signal, Signal, SimpleChanges } from '@angular/core';
import { CardProductComponent } from '../../atomos/card-product/card-product.component';
import { Product } from '../../../interfaces/product';
import { FiltrosProductosComponent } from '../../atomos/filtros-productos/filtros-productos.component';
import { UserService } from '../../../services/user/user.service';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-listado-productos',
  imports: [CardProductComponent, FiltrosProductosComponent],
  templateUrl: './listado-productos.component.html',
  styleUrl: './listado-productos.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ListadoProductosComponent {
  @Input() datos!: Signal<Product[]>; //recibe los datos de descubir.component
  
  @Input() categoriasDeProductos: string[] = [];  // Categorías disponibles para filtrar
  @Input() categoriaSeleccionada: string = 'Todas';
   
  productosFiltrados = signal<Product[]>([]); //signal para los porductos filtrados
  productosPorCategoria: { [key: string]: Product[] } = {};

  usuarioLogueado:any;


  constructor(
    private _userService: UserService,
    private _authService: AuthService,
  ){
    const user = this._authService.getUserFromToken();
    console.log(user.email);

     _userService.getUserByEmail(user.email).subscribe((user)=>{
      this.usuarioLogueado = user
      console.log(Object.keys(this.usuarioLogueado))   
    });   
  }

    ngOnInit(){
      // esperamos
    setTimeout(() => {
      if (this.datos()) {
        this.updateFilteredProducts();

      } else {
        console.log("no hay datos disponibles aún.");
      }
    }, 500);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['datos'] && this.datos()) {
      this.updateFilteredProducts();
    }
    if (changes['usuarioLogueado']) {
      console.log("Usuario actualizado:", this.usuarioLogueado);
    }
  }


  // Filtra los productos según la categoría seleccionada
  updateFilteredProducts(): void {
    const productos = this.datos();

    if (this.categoriaSeleccionada === 'Todas') {
      this.productosPorCategoria = this.groupByCategory(productos);

      this.productosFiltrados.set(productos);  // si no hay filtro, dame todos los productos
    } else { // si sí hay, dame los de esa categoria
      const filtrados = productos.filter(producto =>
        producto.category.includes(this.categoriaSeleccionada)
      );
      this.productosFiltrados.set(filtrados);  // actualiza los productos filtrados
    }
  }

  groupByCategory(products: Product[]): { [category: string]: Product[] } {
    return products.reduce((acumulador: Record<string, Product[]>, producto) => {
      const categorias = Array.isArray(producto.category) ? producto.category : [producto.category]; // // miramos la categoría del producto. convertimos en array si es string

      categorias.forEach(categoria => {
        if (!acumulador[categoria]) { //si no existe una array para esa categoria
          acumulador[categoria] = []; //la creamos
        }
        acumulador[categoria].push(producto); //añadimos el prodcuto a esa categoría
      });
  
      return acumulador; //devolvemos el acumulador con todos los productos
    }, {}); //nicializamos el acumulador como un objeto vacío
  }

  // Método para cambiar la categoría seleccionada
  onCategorySelected(category: string): void {
    this.categoriaSeleccionada = category;  
    this.updateFilteredProducts();  // actualiza los productos filtrados
  }

  onCategoriesLoaded(categorias:string[]):void{
    this.categoriasDeProductos = categorias;
    this.updateFilteredProducts();  // actualiza los productos filtrados

  }

  onGuardarProductoFav(idProducto: string) {
    console.log('Producto recibido:', idProducto);
    console.log('id user:', this.usuarioLogueado._id);
    console.log('favs:', this.usuarioLogueado.misFavs);

    // comprueba si el producto esta ya en favs
    const productoYaGuardado = this.usuarioLogueado.misFavs?.some((fav: { _id: string; }) => fav._id === idProducto);

    if (productoYaGuardado) {
      console.log('producto ya guardado, eliminando.');
      this._userService.deleteFavProduct(this.usuarioLogueado._id, idProducto).subscribe(response => {
        console.log('Producto eliminado de favoritos:', response);
      });
    } else {
      console.log('no está. agregando');
      this._userService.addFavProduct(this.usuarioLogueado._id, idProducto).subscribe(response => {
        console.log('producto agregado a misfavs:', response);
      });
    }
  }
}
