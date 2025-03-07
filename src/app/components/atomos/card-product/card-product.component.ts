import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';


@Component({
  selector: 'app-card-product',
  imports: [MatIcon],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.scss'
})
export class CardProductComponent {
  @Input() producto:{name:string, img: string, rate: number, price: number, site: {}};
    
}
