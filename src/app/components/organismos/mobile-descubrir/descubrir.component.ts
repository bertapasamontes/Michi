import { Component, Signal } from '@angular/core';
import { DataSignalService } from '../../../services/dataSignalService/data-signal.service';
import { ListadoProductosComponent } from "../../moleculas/listado-productos/listado-productos.component";

@Component({
  selector: 'app-descubrir',
  imports: [ListadoProductosComponent],
  templateUrl: './descubrir.component.html',
  styleUrl: './descubrir.component.scss'
})
export class DescubrirComponent {

  constructor(
    private _dataSignalService: DataSignalService
  ){
  }
  dataProducts: Signal<any[]> = this._dataSignalService.productosSinPaginasSignal;
}
