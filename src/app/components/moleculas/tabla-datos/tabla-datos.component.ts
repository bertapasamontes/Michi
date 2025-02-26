import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, input, Input, Pipe, Signal } from '@angular/core';
import { BtnEditarComponent } from "../../atomos/btn-editar/btn-editar.component";
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-tabla-datos',
  imports: [BtnEditarComponent, TitleCasePipe],
  templateUrl: './tabla-datos.component.html',
  styleUrl: './tabla-datos.component.scss',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class TablaDatosComponent {
  @Input() datos!: Signal<any[]>;
  @Input() tipo!:  'usuarios' | 'locales';

  // get columns(): string[] {
  //   const datosActuales = this.datos();
  //   return datosActuales.length > 0 ? Object.keys(datosActuales[0]) : [];
  // }


  // get selectedColumns(): string[] {
  //   return Object.keys(this.columnMapping[this.tipo] || {}); 
  // }

  selectedColumns = computed(()=> Object.keys(this.columnMapping[this.tipo] || {}))

  filteredData = computed(() => {
    return this.datos().map(row => {
      let filteredRow: { id: number; [key: string]: any } = { id: row.id }; // Aseguramos que tenga id
  
      for (let column of this.selectedColumns()) {
        const key = this.columnMapping[this.tipo][column];
        filteredRow[column] = row[key] ?? 'N/A';
      }
  
      return filteredRow;
    });
  });
  
    
  


  private columnMapping: { [key: string]: { [key: string]: string } } = {
    usuarios: { nombre: 'name', apellido: 'surname', username: 'username', rol: 'role' },
    locales: { nombre: 'name', dirección: 'short_direction', categoria: 'category' }
  };


}
