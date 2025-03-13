import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

import { placeGlobal } from '../../../interfaces/places/placeGlobal';
import { Comentario } from '../../../interfaces/comments';
import { ComentarioNuevoService } from '../../../services/comentarioNuevoService/comentario-nuevo.service';
import { AuthService } from '../../../services/auth/auth.service';
import { UserService } from '../../../services/user/user.service';
import { ComentarioNuevoComponent } from '../../atomos/comentario-nuevo/comentario-nuevo.component';
import { ComentarioComponent } from '../../atomos/comentario/comentario.component';

@Component({
  selector: 'app-info-product',
  imports: [MatIcon, ComentarioNuevoComponent, ComentarioComponent],
  templateUrl: './info-product.component.html',
  styleUrl: './info-product.component.scss'
})
export class InfoProductComponent {
  @Input() producto!: {_id: string, imgProduct: string, name: string, rate: number, price: number, comments:Comentario[], site: placeGlobal, category:string[]};

  @Output() actualizaComments = new EventEmitter<boolean>;

  usuarioLogueado:any;

  constructor(
    private _comentarioService: ComentarioNuevoService,
    private _authService: AuthService,
    private _userService: UserService,
    private cdr: ChangeDetectorRef
  ){
    
  }

  ngOnInit(){
    const user = this._authService.getUserFromToken();
    console.log(user.email);

    this._userService.getUserByEmail(user.email).subscribe((user)=>{
      try{
      this.usuarioLogueado = user;
      console.log("user como userLogueado")
      this.cdr.detectChanges();
      }
      catch(error){
        console.log('error al asignar el user como el userloguedo')
      }
    });   
  }

  enviarComentario(comentario:string){
    const nuevoComentario = {
      text: comentario,
      product: this.producto._id,
      user: this.usuarioLogueado._id,
      rating: 0
    };
    console.log(nuevoComentario)

    this._comentarioService.saveComentario(nuevoComentario).subscribe(
      response => {
        console.log("Comentario guardado:", response);
      }, error => {
        console.log("Error al guardar el comentario", error);
      }
    );

    this.actualizaComments.emit(true);
      window.location.reload();
  }
}
