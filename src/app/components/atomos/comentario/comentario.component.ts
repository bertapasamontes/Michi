import { Component, Input } from '@angular/core';
import { placeGlobal } from '../../../interfaces/places/placeGlobal';
import { Comentario } from '../../../interfaces/comments';
import { User } from '../../../interfaces/users';


@Component({
  selector: 'app-comentario',
  imports: [],
  templateUrl: './comentario.component.html',
  styleUrl: './comentario.component.scss'
})
export class ComentarioComponent {
  @Input() comentario!: {text: string, user: User, rating: number};
  

}
