import { Component, Input } from '@angular/core';
import { placeGlobal } from '../../../interfaces/places/placeGlobal';
import { Comentario } from '../../../interfaces/comments';


@Component({
  selector: 'app-comentario',
  imports: [],
  templateUrl: './comentario.component.html',
  styleUrl: './comentario.component.scss'
})
export class ComentarioComponent {
   @Input() producto!: {imgProduct: string, name: string, rate: number, price: number, comments: Comentario, site: placeGlobal, category:string[]};
}
