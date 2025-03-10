import { Component, Input, Signal } from '@angular/core';
import { CardProductComponent } from '../../atomos/card-product/card-product.component';

@Component({
  selector: 'app-listado-productos',
  imports: [CardProductComponent],
  templateUrl: './listado-productos.component.html',
  styleUrl: './listado-productos.component.scss'
})
export class ListadoProductosComponent {
  @Input() datos!: Signal<any[]>; //recibe los datos de descubir.component
 
}
