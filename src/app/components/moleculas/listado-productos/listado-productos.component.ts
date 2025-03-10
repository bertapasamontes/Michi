import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, signal, Signal, SimpleChanges } from '@angular/core';
import { CardProductComponent } from '../../atomos/card-product/card-product.component';
import { Product } from '../../../interfaces/product';
import { FiltrosProductosComponent } from '../../atomos/filtros-productos/filtros-productos.component';

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

    ngOnInit(){
      // Esperamos un poco antes de ejecutar updateFilteredProducts()
    setTimeout(() => {
      if (this.datos()) {
        console.log("✅ [ngOnInit] Datos recibidos:", this.datos());
        this.updateFilteredProducts();
        console.log("productos por cat: ", this.productosPorCategoria);

      } else {
        console.log("⚠️ [ngOnInit] No hay datos disponibles aún.");
      }
    }, 500);


    // if(!this.datos()){
    //   console.log("los datos no hasn sido inicializados correctamente");
    //   return
    // }
    // console.log("productos datos: ", this.datos());
    // console.log("productos por cat:", this.productosPorCategoria);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['datos'] && this.datos()) {
      console.log("🚀 datos cambiaron:", this.datos());
      this.updateFilteredProducts();
    }
  }


  // Filtra los productos según la categoría seleccionada
  updateFilteredProducts(): void {
    const productos = this.datos();

    if (this.categoriaSeleccionada === 'Todas') {


      console.log("datos dentro: ", this.datos())
      this.productosPorCategoria = this.groupByCategory(productos);
      console.log("productos por cat:", this.productosPorCategoria);

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
}
