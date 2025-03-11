import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../../services/products/products.service';

@Component({
  selector: 'app-info-producto',
  imports: [],
  templateUrl: './info-producto.component.html',
  styleUrl: './info-producto.component.scss'
})
export class InfoProductoComponent {
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
          console.log(product);
      })
      console.log("producto: ", producto)
    }
    catch(error){
      return console.log('Error al buscar el produto por id')
    }
  }

  
}
