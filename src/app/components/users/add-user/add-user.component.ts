import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { UserService } from '../../../services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { ProgressBarComponent } from "../../shared/progress-bar/progress-bar.component";
import { User } from '../../../interfaces/users';

@Component({
  selector: 'app-add-user',
  imports: [MatIcon, ReactiveFormsModule, ProgressBarComponent],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {
  formAddUser: FormGroup;
  loading: Boolean = false;
  operacion: string = 'Añadir nuevo'

  constructor(
      public _matDialogRef: MatDialogRef<AddUserComponent>,
      @Inject(MAT_DIALOG_DATA) public data:any, //recibir data

      //formulario
      private formBuilder: FormBuilder,

      //servicio user
      private _userService: UserService,

      //toast
      private toastr: ToastrService
      
    ){
      console.log("id recibido:", this.data.id);
      this.data.name; //recibiendo data en el HTML

      //formulario
      this.formAddUser = formBuilder.group({
        name: ['', Validators.required],
        surname: [''],
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(4)]]

      })
    }

    ngOnInit(){
      if(this.data.id != undefined){
        this.operacion = 'Editar';

        this.getUser(this.data.id)
      }
    }

    addUser(){
      const usuarioNuevo: User = {
        name: this.formAddUser.value.name,
        surname: this.formAddUser.value.surname,
        username: this.formAddUser.value.username,
        password: this.formAddUser.value.password,
        email: this.formAddUser.value.email       
      }
      console.log(usuarioNuevo);
      this.loading = true;
      if(this.data.id !== undefined){
        //editar  
        usuarioNuevo._id = this.data.id;
        this._userService.updateUser(this.data.id, usuarioNuevo).subscribe(()=>{
          this.toastr.success(`El usuario ${usuarioNuevo.name} ha sido editado exitosamente`, 'Usuario editado')
        })

      } else{
        //añadir nuevo user
        this._userService.saveUser(usuarioNuevo).subscribe(()=>{
          this.toastr.success(`${usuarioNuevo.name} añadido exitosamente a la base de datos`, 'Usuario nuevo')
        })
      }
      this.loading = false;
      this._matDialogRef.close();

      this._matDialogRef.close(true);
    }

    getUser(id:number){
      this.loading = true;
      this._userService.getUser(id).subscribe((data: User)=>{
        console.log('obteniendo datos del user');
        console.log(data);
        this.loading=false;
        this.formAddUser.setValue({
          name: data.name,
          surname: data.surname,
          username: data.username,
          email: data.email,
          password: data.password
        })
      })
    }

    volver(){
      this._matDialogRef.close();
    }
}
