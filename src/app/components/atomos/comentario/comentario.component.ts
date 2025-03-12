import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { User } from '../../../interfaces/users';
import { MatIcon } from '@angular/material/icon';
import { ComentarioNuevoService } from '../../../services/comentarioNuevoService/comentario-nuevo.service';
import ComentarioNuevo from '../../../model/comments';
import { Comentario } from '../../../interfaces/comments';


@Component({
  selector: 'app-comentario',
  imports: [MatIcon],
  templateUrl: './comentario.component.html',
  styleUrl: './comentario.component.scss'
})
export class ComentarioComponent {
  @Input() comentario!: Comentario;
  @Input() productoId!: string;

  constructor(
    private cdr: ChangeDetectorRef,
    private _comentarioService: ComentarioNuevoService
  ){
  }

  likeComment(){
    const nuevoRating = this.comentario.rating + 1;

    const comentarioNuevo = new ComentarioNuevo ({
      text : this.comentario.text,
      user: this.comentario.user,
      rating: nuevoRating,
      createdAt: this.comentario.createdAt
    })

    // this._comentarioService.updateComentario(this.productoId, comentarioNuevo)

    console.log("like");
    return this.comentario.rating = this.comentario.rating + 1;
  }

}
