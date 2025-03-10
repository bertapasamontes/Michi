import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { placeGlobal } from '../../../interfaces/places/placeGlobal';
import { RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-card-product',
  imports: [MatIcon, RouterLink, RouterLinkActive],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.scss'
})
export class CardProductComponent {
  @Input() producto!:{_id?:number ,name:string, imgProduct: string, rate: number, price: number, site: placeGlobal};

  ngOnInit(){
    console.log("producto en card",this.producto)
  }

  // irAlProducto(){
  //   window.location.href = `user/descubrir/producto/${this.producto._id}`
  // }
    
}
