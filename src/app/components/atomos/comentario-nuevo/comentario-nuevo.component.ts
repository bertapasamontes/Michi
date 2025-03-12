import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { UserService } from '../../../services/user/user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../interfaces/users';

@Component({
  selector: 'app-comentario-nuevo',
  imports: [ReactiveFormsModule],
  templateUrl: './comentario-nuevo.component.html',
  styleUrl: './comentario-nuevo.component.scss'
})
export class ComentarioNuevoComponent {

  usuarioLogueado!:User;
  formComentario!: FormGroup;

  @Output() comentarioNuevo = new EventEmitter<string>();
  
  constructor(
    private _authService: AuthService,
    private _userService: UserService,
    private formBuilder: FormBuilder,
    private cdr: ChangeDetectorRef
  ){

    const user = _authService.getUserFromToken();
    console.log(user.email);

    _userService.getUserByEmail(user.email).subscribe((user)=>{
      try{
      this.usuarioLogueado = user;
      console.log("comentario nuevo: user como userLogueado")
      console.log(this.usuarioLogueado.imgProfile);
      console.log(this.usuarioLogueado);
      this.cdr.detectChanges();
      }
      catch(error){
        console.log('comentario nuevo: error al asignar el user como el userloguedo')
      }
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
    this.formComentario.reset();
  }


}
