import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-btn-delete',
  imports: [MatIcon, SweetAlert2Module],
  templateUrl: './btn-delete.component.html',
  styleUrl: './btn-delete.component.scss'
})
export class BtnDeleteComponent {
  @Input() item!:number;
  @Input() tipo!: 'usuarios' | 'locales';
  @Output() removeItem = new EventEmitter<{ id: number; tipo: 'usuarios' | 'locales' }>();
  
  deleteItem(id: number){
    this.removeItem.emit({id: id, tipo: this.tipo});
    console.log('delete:', id, this.tipo);
    Swal.fire("Eliminado", 'El elemento ha sido eliminado', 'success')
    .then(()=>{
      location.reload()
  });

  }
}
