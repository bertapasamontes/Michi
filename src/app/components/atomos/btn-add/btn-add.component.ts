import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../../users/add-user/add-user.component';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-btn-add',
  imports: [MatIcon],
  templateUrl: './btn-add.component.html',
  styleUrl: './btn-add.component.scss'
})
export class BtnAddComponent {

  constructor(
    private _matDialog: MatDialog
  ){}

  abrirNuevoUser():void{
      const dialogo = this._matDialog.open(AddUserComponent, {
        width: '900px',
        data: {
          // id: this.usuariosEnMichi.id,
          // name: this.usuariosEnMichi[0].name
        }
      });
      dialogo.afterClosed().subscribe(result=>{
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
