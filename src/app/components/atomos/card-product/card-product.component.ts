import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-card-product',
  imports: [MatIcon],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.scss'
})
export class CardProductComponent {
  @Input() producto!:{name:string, imgProduct: string, rate: number, price: number, site: string};

  ngOnInit(){
    console.log("producto en card",this.producto)
  }
    
}
