import { Component, CUSTOM_ELEMENTS_SCHEMA, EventEmitter, Input, Output, output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { AddUserComponent } from '../../users/add-user/add-user.component';

@Component({
  selector: 'app-btn-editar',
  imports: [MatIcon],
  templateUrl: './btn-editar.component.html',
  styleUrl: './btn-editar.component.scss',
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class BtnEditarComponent {
  constructor(
     private _matDialog: MatDialog,
  ){}
  
  @Input() item!:number;
  @Input() tipo!:string;
  @Output() updateData = new EventEmitter<void>();
  
  abrirEdit(id:number):void{
    const dialogo = this._matDialog.open(AddUserComponent, {
      width: '900px',
      data: {
        id: id,
        tipo: this.tipo
      }
    });

    console.log('item: ', this.item);

    dialogo.afterClosed().subscribe((result)=>{
      console.log('dialogo cerrado');
      if(result){
        console.log("va bieeen");
        this.updateData.emit();
      }else{
        console.log('somethign is wrong')
      }
    })
  }
}
