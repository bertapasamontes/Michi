import { Component, Input } from '@angular/core';
import { User } from '../../../interfaces/users';
import { CardProductComponent } from '../../atomos/card-product/card-product.component';

@Component({
  selector: 'app-producto-fav',
  imports: [CardProductComponent],
  templateUrl: './producto-fav.component.html',
  styleUrl: './producto-fav.component.scss'
})
export class ProductoFavComponent {
  @Input() usuarioLogueado!: User;

  ngOnInit(){
    console.log("user logueado desde producto fav:  ",this.usuarioLogueado);
  }
}
