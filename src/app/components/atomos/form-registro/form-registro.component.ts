import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../services/user/user.service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-form-registro',
  imports: [ReactiveFormsModule, MatIcon],
  templateUrl: './form-registro.component.html',
  styleUrl: './form-registro.component.scss'
})
export class FormRegistroComponent {
  formRegistro: FormGroup;

  constructor(
    //formulario
    private formBuilder: FormBuilder,
    private _userService: UserService
  ) 
    {
    //formulario
    this.formRegistro = formBuilder.group({
      name: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  @Output() registerEvent = new EventEmitter<{ email: string, password: string, name: string, username: string, role: string }>();

  registro(){
    const name = this.formRegistro.value.name;
    const username = this.formRegistro.value.username;
    const email = this.formRegistro.value.email;
    const password = this.formRegistro.value.password;
    const role = 'viewer';

    this.registerEvent.emit({ email: email, password: password, name: name , username: username , role: role }); //enviamos los datos al compontente padre
   
  }




}
