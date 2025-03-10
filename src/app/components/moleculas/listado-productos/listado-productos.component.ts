import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, signal, Signal } from '@angular/core';
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

  constructor() {
    ()=>{
      this.updateFilteredProducts();
    }
  }
  get productos(): Product[] {
    return this.datos(); 
  }


  // Filtra los productos según la categoría seleccionada
  updateFilteredProducts(): void {
    const productos = this.productos;
    if (this.categoriaSeleccionada === 'Todas') {
      this.productosFiltrados.set(productos);  // Si no hay filtro, devuelve todos los productos
    } else {
      const filtrados = productos.filter(producto =>
        producto.category.includes(this.categoriaSeleccionada)
      );
      this.productosFiltrados.set(filtrados);  // Actualiza los productos filtrados
    }
  }

  // Método para cambiar la categoría seleccionada
  onCategorySelected(category: string): void {
    this.categoriaSeleccionada = category;  // Actualiza el filtro con la categoría seleccionada
    this.updateFilteredProducts();  // Actualiza los productos filtrados
  }
}
