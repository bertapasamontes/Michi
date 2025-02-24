import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filtro-mapa',
  imports: [],
  templateUrl: './filtro-mapa.component.html',
  styleUrl: './filtro-mapa.component.scss'
})
export class FiltroMapaComponent {

  @Input() categorias: string[] = []; // recibe todas las categorías
  @Input() categoriasSeleccionadas: string[] = []; // recibe las categorias seleccionadas

  @Output() categoriasCambiadas = new EventEmitter<string[]>(); // emite los cambios del toggle

  toggleCategoria(categoria: string) {
    if (this.categoriasSeleccionadas.includes(categoria)) {
      this.categoriasSeleccionadas = this.categoriasSeleccionadas.filter(cat => cat !== categoria);
    } else {
      this.categoriasSeleccionadas.push(categoria);
    }
    this.categoriasCambiadas.emit(this.categoriasSeleccionadas); 
  }  
}
