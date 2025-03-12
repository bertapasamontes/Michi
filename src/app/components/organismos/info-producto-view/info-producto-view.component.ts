import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../services/products/products.service';
import { InfoProductComponent } from '../../moleculas/info-product/info-product.component';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-info-producto-view',
  imports: [InfoProductComponent],
  templateUrl: './info-producto-view.component.html',
  styleUrl: './info-producto-view.component.scss'
})
export class InfoProductoViewComponent {

  productoRecibido!:any;


  constructor(
    private ruta: ActivatedRoute,
    private _productoService: ProductsService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef 
  ){}

  ngOnInit(){
    const id:string | null = this.ruta.snapshot.paramMap.get('id');
    if (id) {
      this.getInfoProductById(id);
    }
    else{
      console.log("nop")
    }

  }

  getInfoProductById(id: string){
    try{
      const producto = this._productoService.getProduct(id).subscribe((product)=>{
          this.productoRecibido = product;
          console.log(product);
      })
      console.log("producto: ", producto)
    }
    catch(error){
      return console.log('Error al buscar el produto por id')
    }
  }

  actualiza(valor: boolean){
    if(valor){
      this._productoService.getProduct(this.productoRecibido._id).subscribe((product)=>{
        this.productoRecibido = product;
        console.log("Producto actualizado:", this.productoRecibido);
        this.cdr.detectChanges(); 
      this.toastr.success(`Comentario añadido exitosamente`, 'Comentario nuevo');
    })
    }
    window.location.reload();
  }

  
}
