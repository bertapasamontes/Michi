import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { UserService } from '../../../services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { ProgressBarComponent } from "../../shared/progress-bar/progress-bar.component";
import { User } from '../../../interfaces/users';
import { ProductsService } from '../../../services/products/products.service';
import { Product } from '../../../interfaces/product';

@Component({
  selector: 'app-add-user',
  imports: [MatIcon, ReactiveFormsModule, ProgressBarComponent, MatIcon],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {
  formAddUser: FormGroup;
  loading: Boolean = false;
  operacion: string = 'Añadir nuevo';
  tipoOperacion: string = 'usuario';

  tipoForm: 'usuarios' | 'productos' = 'usuarios';

  selectedFile: File | null = null;


  constructor(
      public _matDialogRef: MatDialogRef<AddUserComponent>,
      @Inject(MAT_DIALOG_DATA) public data:any, //recibir data

      //formulario
      private formBuilder: FormBuilder,

      //servicios
      private _userService: UserService,
      private _productService: ProductsService,

      //toast
      private toastr: ToastrService
      
    ){
      console.log("id recibido:", this.data.id);
      this.data.name; //recibiendo data en el HTML

      this.tipoForm = this.data.tipo || 'usuarios';

      if(this.tipoForm == 'productos'){
        this.tipoOperacion = 'producto'
      }
      console.log("tipo form: ",this.tipoForm); 
      
      this.formAddUser = this.crearFormSegunTipo(this.tipoForm);
    }

    ngOnInit(){
      if(this.data.id != undefined){
        this.operacion = 'Editar';

        this.getDataByType(this.data.id)
      }
    }

    crearFormSegunTipo(tipoDatos: string): FormGroup<any>{
      //formulario
      if(tipoDatos == 'usuarios'){
        return this.formBuilder.group({
          name: ['', Validators.required],
          // surname: [''],
          username: ['', Validators.required],
          email: ['', [Validators.required, Validators.email]],
          password: ['', [Validators.required, Validators.minLength(4)]],
          role: ['', Validators.required]
  
        })
      }
      else {
        return this.formBuilder.group({
          // image: ['', Validators.required],
          name: ['', Validators.required],
          rate: ['', Validators.required],
          price:['', Validators.required],
          site: ['', Validators.required],
          category: ['', Validators.required],  
        })
      }

    }



    addUser(){
      if(this.tipoForm == 'usuarios'){
        const usuarioNuevo: User = {
          name: this.formAddUser.value.name,
          // surname: this.formAddUser.value.surname,
          username: this.formAddUser.value.username,
          password: this.formAddUser.value.password,
          email: this.formAddUser.value.email,
          role: this.formAddUser.value.role
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
      }

      if(this.tipoForm == 'productos'){

        const productoNuevo: Product = {
          imgProduct:  this.formAddUser.value.name,
          name: this.formAddUser.value.name,
          rate: this.formAddUser.value.rate,
          price: this.formAddUser.value.price,
          site: this.formAddUser.value.site,
          category: this.formAddUser.value.category
        }
        console.log(productoNuevo);
        this.loading = true;
        if(this.data.id !== undefined){
          //editar  
          productoNuevo._id = this.data.id;
          this._productService.updateProduct(this.data.id, productoNuevo).subscribe(()=>{
            this.toastr.success(`El producto ${productoNuevo.name} ha sido editado exitosamente`, 'Producto editado')
          })
  
        } else{
          //añadir nuevo user
          this._productService.saveProduct(productoNuevo).subscribe(()=>{
            this.toastr.success(`${productoNuevo.name} añadido exitosamente a la base de datos`, 'Producto nuevo')
          })
        }
      }
      
      this.loading = false;
      this._matDialogRef.close();

      this._matDialogRef.close(true);
    }

  

    getDataByType(id:string){
      this.loading = true;

      if(this.data.tipo == 'usuarios'){
          this._userService.getUser(id).subscribe((data: User)=>{
          console.log('obteniendo datos del user');
          console.log(data);
          this.loading=false;
          this.formAddUser.setValue({
            name: data.name,
            username: data.username,
            email: data.email,
            password: data.password,
            role: data.role
          })
        })
      }
      else{

        let imageUrl = this.formAddUser.value.imgProduct;

        this._productService.getProduct(id).subscribe((data: Product)=>{
          console.log('obteniendo datos del producto');
          console.log(data);
          this.loading=false;
          this.formAddUser.setValue({
            imgProduct: data.name,
            name: data.name,
            rate: data.rate,
            price: data.price,
            site: data.site,
            category: data.category
          })
        })
      }

    }

    volver(){
      this._matDialogRef.close();
    }
}
