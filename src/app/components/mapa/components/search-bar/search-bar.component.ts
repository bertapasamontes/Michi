import { Component } from '@angular/core';
import { SearchResultsComponent } from "../search-results/search-results.component";
import { PlacesService } from '../../../../services/mapa/places/places-service.service';

@Component({
  selector: 'app-search-bar',
  imports: [SearchResultsComponent],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss'
})
export class SearchBarComponent {

  private tiempoDeRebote?: NodeJS.Timeout

  constructor(
    private _placesService: PlacesService
  ){}

  //función para mandar los datos buscados en el input una vez que pasa 1s
  onQueryChanged(query: string){ 
    if( this.tiempoDeRebote) clearTimeout(this.tiempoDeRebote);
    this.tiempoDeRebote = setTimeout(()=>{
      console.log("query", query);
      this._placesService.getPlacesByQuery(query);

    }, 1000);
  }
}
