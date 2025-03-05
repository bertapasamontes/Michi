import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-form-inicio-sesion',
  imports: [ReactiveFormsModule],
  templateUrl: './form-inicio-sesion.component.html',
  styleUrl: './form-inicio-sesion.component.scss'
})
export class FormInicioSesionComponent {
  formInicioSesion: FormGroup;

  constructor(
    //formulario
    private formBuilder: FormBuilder,
    private _userService: UserService
  ) 
    {
    //formulario
    this.formInicioSesion = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  @Output() loginEvent = new EventEmitter<{ email: string, password: string }>();

  iniciarSesion(){
    const email = this.formInicioSesion.value.email;
    const password = this.formInicioSesion.value.password;

    this.loginEvent.emit({ email: email, password: password }); //enviamos los datos al compontente padre
  }



}
