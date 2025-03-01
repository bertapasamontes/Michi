import { ChangeDetectorRef, Component, computed, CUSTOM_ELEMENTS_SCHEMA, effect, EventEmitter, input, Input, Output, Pipe, Signal } from '@angular/core';
import { BtnEditarComponent } from "../../atomos/btn-editar/btn-editar.component";
import { NgClass, TitleCasePipe } from '@angular/common';
import { BtnDeleteComponent } from "../../atomos/btn-delete/btn-delete.component";
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-tabla-datos',
  imports: [BtnEditarComponent, TitleCasePipe, BtnDeleteComponent],
  templateUrl: './tabla-datos.component.html',
  styleUrl: './tabla-datos.component.scss',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class TablaDatosComponent {
  @Input() datos!: Signal<any[]>;
  @Input() tipo!:  'usuarios' | 'locales';
  @Output() deleteItem = new EventEmitter<{ id: number; tipo: 'usuarios' | 'locales' }>();

  selectedColumns = computed(()=> Object.keys(this.columnMapping[this.tipo] || {}))

  // Crear un Signal que calcule filteredData basado en datos()
  filteredData = computed(() => {
    return this.datos().map(row => {
      let filteredRow: { [key: string]: any } = { id: row._id }; // Intentar extraer el ID
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

  refreshData(): void {
    location.reload();
  }

  onDeleteItem(id: number, tipo: 'usuarios' | 'locales'): void {
    console.log(`📢 Notificando a home para eliminar ${tipo} con ID: ${id}`);
    this.deleteItem.emit({ id, tipo }); // 🔥 Enviamos el evento a home
    // this.refreshData();
  }




  getClassForColumn(column: string, value: string): string {
    if (column === 'rol') {
      return this.getRoleClass(value);
    }
    if (column === 'categoria') {
      return this.getCategoryClass(value);
    }
    return '';
  }
  
  getRoleClass(role: string): string {
    const roleClasses: { [key: string]: string } = {
      'admin': 'tag-admin',
      'usuario': 'tag-user',
      'moderador': 'tag-moderator',
    };
    return roleClasses[role?.toLowerCase()] || 'tag-default';
  }
  
  getCategoryClass(category: string): string {
    const categoryClasses: { [key: string]: string } = {
      'café': 'tag-cafe',
      'cafetería': 'tag-cafe',
      'comida y bebida': 'tag-drink-food',
      'restaurant': 'tag-restaurant',
      'panadería': 'tag-bakery',
    };
    return categoryClasses[category?.toLowerCase()] || 'tag-default';
  }
  
  getRoleIcon(role: string): string {
    const roleIcons: { [key: string]: string } = {
      'admin': 'admin_panel_settings',
      'viewer': 'person'
    };
    return roleIcons[role?.toLowerCase()] || 'help';
  }
  
  getCategoryIcon(category: string): string {
    const categoryIcons: { [key: string]: string } = {
      'café': 'local_cafe',
      'cafetería': 'local_cafe',
      'comida y bebida': 'restaurant',
      'restaurant': 'restaurant',
      'panadería': 'bakery_dining',
    };
    return categoryIcons[category?.toLowerCase()] || 'sell'; // Ícono por defecto
  }
}  