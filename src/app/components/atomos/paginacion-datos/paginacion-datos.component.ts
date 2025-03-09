import { Component, EventEmitter, Input, Output, Signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-paginacion-datos',
  imports: [MatIcon],
  templateUrl: './paginacion-datos.component.html',
  styleUrl: './paginacion-datos.component.scss'
})
export class PaginacionDatosComponent {

  @Input() tipo!:  'usuarios' | 'locales' | 'productos';
  @Input() totalPagesSignal!: number;
  @Input() paginaActualSignal!: number;

  @Output() paginaActual = new EventEmitter<{ pagina: number; tipo: 'usuarios' | 'locales' | 'productos'}>();

  emitirCambiarPagina(pagina: number, tipo: 'usuarios' | 'locales' | 'productos'){
    this.paginaActual.emit({ pagina, tipo }); // Enviamos el evento a home
  }
}
