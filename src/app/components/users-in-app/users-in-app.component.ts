import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon'
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { UserService } from '../../services/user/user.service.js';

import { User } from '../../interfaces/users.js';
import { ProgressBarComponent } from "../shared/progress-bar/progress-bar.component";
import { ToastrService } from 'ngx-toastr';
import { AddUserComponent } from '../add-user/add-user.component';

@Component({
    selector: 'app-users-in-app',
    imports: [MatIconModule, MatButtonModule, ProgressBarComponent],
    templateUrl: './users-in-app.component.html',
    styleUrl: './users-in-app.component.scss'
})
export class UsersInAppComponent {
  usuariosEnMichi: User[]=[]
  loading: Boolean = false;

  constructor(
    private _matDialog: MatDialog,
    private _userService: UserService,
    private toastr: ToastrService
  ){
    
  }

  ngOnInit(){
    this.getListUsers();
  }

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
        this.getListUsers();
      }else{
        console.log('somethign is wrong')
      }
    })
  }
  

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
        this.getListUsers();
      }else{
        console.log('somethign is wrong')
      }
    })
  }

  getListUsers(){
    this.loading = true;
    this._userService.getListUsers().subscribe((data:User[])=>{
      console.log("users:", data);
      this.usuariosEnMichi = data;
      this.loading = false;
    })
  }

  deleteUser(id:number){
    this.loading = true;
    this._userService.deleteUser(id).subscribe(() =>{
      this.getListUsers(); // para volver a cargar la lista y que no se queden los antiguos
    })
    this.toastr.success('Usuario eliminado exitosamente', 'User eliminado')
  }
}
