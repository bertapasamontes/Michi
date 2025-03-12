import { Component, Input } from '@angular/core';
import { User } from '../../../interfaces/users';

@Component({
  selector: 'app-producto-fav',
  imports: [],
  templateUrl: './producto-fav.component.html',
  styleUrl: './producto-fav.component.scss'
})
export class ProductoFavComponent {
  @Input() usuarioLogueado!: User;
}
