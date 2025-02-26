import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
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
  
  @Input() item!:  { id: number } & Record<string, any>;
  
  abrirEdit(id:number):void{
      
    
      const dialogo = this._matDialog.open(AddUserComponent, {
        width: '900px',
        data: {
          id: id,
          // info: this.usuariosEnMichi.findIndex()
          // name: this.usuariosEnMichi[0].name
        }
      });
  
      dialogo.afterClosed().subscribe((result)=>{
        console.log('dialogo cerrado');
        if(result){
          console.log("va bieeen");
          // this.getListUsers();
        }else{
          console.log('somethign is wrong')
        }
      })
    }
}
