import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { UserService } from '../../../services/user/user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-comentario-nuevo',
  imports: [ReactiveFormsModule],
  templateUrl: './comentario-nuevo.component.html',
  styleUrl: './comentario-nuevo.component.scss'
})
export class ComentarioNuevoComponent {

  usuarioLogueado:any = {}
  formComentario: FormGroup;

  @Output() comentarioNuevo = new EventEmitter<string>();
  
  constructor(
    private _authService: AuthService,
    private _userService: UserService,
    private formBuilder: FormBuilder,
  ){
    const user = this._authService.getUserFromToken();
    console.log(user.email);

    _userService.getUserByEmail(user.email).subscribe((user)=>{
    console.log("user desde comentario: ", user)
    this.usuarioLogueado = user      
    });   


    //form
    this.formComentario = formBuilder.group({
      comentario: ['', [Validators.required, Validators.minLength(6)]]
    })
  }
  
  enviarComment(){
    const comentario = this.formComentario.value.comentario;
    console.log("comentario: ", comentario)

    if (!comentario) {
      console.warn("El comentario está vacío");
      return;
    }

    this.comentarioNuevo.emit(comentario); //enviamos los datos al compontente padre
  }


}
