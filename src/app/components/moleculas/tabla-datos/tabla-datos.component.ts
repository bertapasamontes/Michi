import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, Signal } from '@angular/core';
import { BtnEditarComponent } from "../../atomos/btn-editar/btn-editar.component";
import { TitleCasePipe } from '@angular/common';
import { BtnDeleteComponent } from "../../atomos/btn-delete/btn-delete.component";
import { BtnClipboardComponent } from "../../atomos/btn-clipboard/btn-clipboard.component";

@Component({
  selector: 'app-tabla-datos',
  imports: [BtnEditarComponent, TitleCasePipe, BtnDeleteComponent, BtnClipboardComponent],
  templateUrl: './tabla-datos.component.html',
  styleUrl: './tabla-datos.component.scss',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class TablaDatosComponent {
  @Input() datos!: Signal<any[]>;
  @Input() tipo!:  'usuarios' | 'locales' | 'productos';
  @Output() deleteItem = new EventEmitter<{ id: number; tipo: 'usuarios' | 'locales' | 'productos'}>();

  selectedColumns = computed(()=> Object.keys(this.columnMapping[this.tipo] || {}))

  // signal que calcula filteredData basado en datos()
  filteredData = computed(() => {
    return  (this.datos() ?? []).map(row => { //si datos es un array, hace el map
      let filteredRow: { [key: string]: any } = { id: row._id }; //extrae el ID
      for (let column of this.selectedColumns()) {
        const key = this.columnMapping[this.tipo][column];

        //Si el tipo es 'productos':
        if(this.tipo == 'productos'){
          if(column == 'dirección' && row[key] && row[key].name){
            filteredRow[column] = row[key].name;
          } 

          else if (column === 'comentarios' && row[key]) {
            filteredRow[column] = row[key];
          }

          else if(column != 'comentarios' && column != 'dirección'){
            filteredRow[column] = row[key] ?? 'no hay';
          } 
        }

        //si no, muestralo tal cual
        else {
          filteredRow[column] = row[key] ?? 'no hay';
        }
      }
      return filteredRow;
    });
  });

  //decidimos las columnas que habrá por cada tipo de datos que pasen
  private columnMapping: { [key: string]: { [key: string]: string } } = { 
    usuarios: {  imagen: 'imgProfile', nombre: 'name', username: 'username', email: 'email', rol: 'role' },
    locales: { nombre: 'name', dirección: 'short_direction', categoría: 'category' },
    productos: { imagen: 'imgProduct', nombre: 'name', puntuación:'rate', comentarios: 'comments' , dirección: 'site', categoría: 'category'}
  };

  refreshData(): void {
    location.reload();
  }

  onDeleteItem(id: number, tipo: 'usuarios' | 'locales' | 'productos'): void {
    console.log(`📢 Notificando a home para eliminar ${tipo} con ID: ${id}`);
    this.deleteItem.emit({ id, tipo }); // Enviamos el evento a home
    // this.refreshData();
  }
}  