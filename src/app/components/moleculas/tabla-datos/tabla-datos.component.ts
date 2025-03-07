import { Component, computed, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, Signal } from '@angular/core';
import { BtnEditarComponent } from "../../atomos/btn-editar/btn-editar.component";
import { TitleCasePipe } from '@angular/common';
import { BtnDeleteComponent } from "../../atomos/btn-delete/btn-delete.component";

@Component({
  selector: 'app-tabla-datos',
  imports: [BtnEditarComponent, TitleCasePipe, BtnDeleteComponent],
  templateUrl: './tabla-datos.component.html',
  styleUrl: './tabla-datos.component.scss',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class TablaDatosComponent {
  @Input() datos!: Signal<any[]>;
  @Input() tipo!:  'usuarios' | 'locales' | 'productos';
  @Output() deleteItem = new EventEmitter<{ id: number; tipo: 'usuarios' | 'locales' | 'productos'}>();

  selectedColumns = computed(()=> Object.keys(this.columnMapping[this.tipo] || {}))

  // Crear un Signal que calcule filteredData basado en datos()
  filteredData = computed(() => {
    return this.datos().map(row => {
      let filteredRow: { [key: string]: any } = { id: row._id }; // Intentar extraer el ID
      for (let column of this.selectedColumns()) {
        const key = this.columnMapping[this.tipo][column];
        filteredRow[column] = row[key] ?? 'no hay';
      }
      return filteredRow;
    });
  });

  private columnMapping: { [key: string]: { [key: string]: string } } = {
    usuarios: { nombre: 'name', username: 'username', email: 'email', rol: 'role' },
    locales: { nombre: 'name', dirección: 'short_direction', categoria: 'category' },
    productos: { nombre: 'name', puntuación:'rate', comentarios: 'comments' , dirección: 'site', categoria: 'category'}
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