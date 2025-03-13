import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { placeGlobal } from '../../../interfaces/places/placeGlobal';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Product } from '../../../interfaces/product';



@Component({
  selector: 'app-card-product',
  imports: [MatIcon, RouterLink, RouterLinkActive],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.scss'
})
export class CardProductComponent {
  @Input() producto!:Product;

  // ngOnInit(){
  //   console.log("producto en card",this.producto)
  // }

  @Output() productoId = new EventEmitter<string>();

  guardarProducto(productoID: string){
    this.productoId.emit(productoID);
    console.log("enviado id", productoID);
  }    
}
