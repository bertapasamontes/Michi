import { Component, EventEmitter, Output } from '@angular/core';
import { DataSignalService } from '../../../services/dataSignalService/data-signal.service';
import { ProductsService } from '../../../services/products/products.service';
import { Product } from '../../../interfaces/product';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filtros-productos',
  imports: [FormsModule],
  templateUrl: './filtros-productos.component.html',
  styleUrl: './filtros-productos.component.scss'
})
export class FiltrosProductosComponent {

  @Output() categorySelectedSignal = new EventEmitter<string>();
  @Output() categoriasDeProductosSignal = new EventEmitter<string[]>();

  selectedCategory: string = 'Todas';
  categoriasDeProductos: string[] = [];


  constructor(
    private _productService: ProductsService
  ){}


  ngOnInit(): void {
    this._productService.getListProductsWithoutPages().subscribe((productos: Product[]) => {
      this.obtenerCategorias(productos);
    });
  }

  obtenerCategorias(productos: Product[]): void {
    const categoriasUnicas = new Set<string>();  //evitamos duplicados

    //cecorremos los productos
    productos.forEach(producto => {
      if (producto.category) {
        producto.category.forEach((categoria: string) => {
          categoriasUnicas.add(categoria); //extraemos las categorías
        });
      }
    });

    // convertimos el Set a un array y lo asignamos
    this.categoriasDeProductos = Array.from(categoriasUnicas);
    console.log('Categorías disponibles de productos:', this.categoriasDeProductos);
  }

  onCategoryChange(){
    this.categorySelectedSignal.emit(this.selectedCategory);
    this.categoriasDeProductosSignal.emit(this.categoriasDeProductos);
  }
  
}
