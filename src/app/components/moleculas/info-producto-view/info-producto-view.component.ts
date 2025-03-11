import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../services/products/products.service';
import { InfoProductComponent } from "../../atomos/info-product/info-product.component";

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
    private _productoService: ProductsService
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

  
}
