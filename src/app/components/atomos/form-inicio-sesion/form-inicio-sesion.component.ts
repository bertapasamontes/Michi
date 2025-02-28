import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-inicio-sesion',
  imports: [ReactiveFormsModule],
  templateUrl: './form-inicio-sesion.component.html',
  styleUrl: './form-inicio-sesion.component.scss'
})
export class FormInicioSesionComponent {
  formInicioSesion: FormGroup;
  operacion: string = 'Inicio de sesión';

  constructor(
    //formulario
    private formBuilder: FormBuilder,
  ) 
    {
    //formulario
    this.formInicioSesion = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  iniciarSesion(){
    
  }


}
