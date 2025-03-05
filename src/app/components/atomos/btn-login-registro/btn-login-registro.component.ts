import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-btn-login-registro',
  imports: [],
  templateUrl: './btn-login-registro.component.html',
  styleUrl: './btn-login-registro.component.scss'
})
export class BtnLoginRegistroComponent {

  @Input() operacionAlBoton:string = '';

  @Output() operation = new EventEmitter<string>();
  cambiarOperacion(value:string){
    this.operation.emit(value);
  }
}
