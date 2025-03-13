import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { User } from '../../../interfaces/users';
import { CardProductComponent } from '../../atomos/card-product/card-product.component';
import { Product } from '../../../interfaces/product';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-producto-fav',
  imports: [CardProductComponent],
  templateUrl: './producto-fav.component.html',
  styleUrl: './producto-fav.component.scss'
})
export class ProductoFavComponent {
  @Input() usuarioLogueado!: User;
  @Input() productoRecibido!: Product;

  @Output() productoId = new EventEmitter<string>();


  constructor(    
  ) {
    console.log("ProductoFavComponent se está construyendo");
    // console.log("user logueado desde constructor producto fav:  ",this.usuarioLogueado);

  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("buenas");
    if (changes['usuarioLogueado'] && changes['usuarioLogueado'].currentValue) {
      console.log("✅ Usuario logueado actualizado:", this.usuarioLogueado);
    }
    console.log("tardes");

  }
  // ngAfterViewInit(){
  //   console.log("✅ Usuario logueado actualizado000:", this.usuarioLogueado);

  // }

  onGuardarProductoFav(idProducto: string) {
    this.productoId.emit(idProducto);
  }
}
