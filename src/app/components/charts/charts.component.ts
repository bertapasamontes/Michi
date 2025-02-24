import { Component, ElementRef, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { UserService } from '../../services/user/user.service';
import { PlacesService } from '../../services/mapa/places/places-service.service';
import { CalendarService } from '../../services/calendar/calendar.service';
import { MapService } from '../../services/mapa/map/map.service';
import { MapGlobalService } from '../../services/mapa/map-global.service';
import { getuid } from 'process';
import SitioNuevo from '../../model/places';


@Component({
    selector: 'app-charts',
    imports: [],
    templateUrl: './charts.component.html',
    styleUrl: './charts.component.scss'
})
export class ChartsComponent {
    @ViewChild('chartCanvas') chartCanvas!: ElementRef;
    @ViewChild('chartCanvas2') chartCanvas2!: ElementRef;

    constructor(
        private _userService: UserService,
        private _mapService: MapGlobalService,
        private _calendarService: CalendarService,

    ) {
        Chart.register(...registerables); // registrando todos los tipos de graficos de una
      }
    numUsers: Number = 0;
    numRestaurantes: Number = 0;
    numEventos: Number = 0;

    ngAfterViewInit() {
        this.loadData(); 
    }

    crearChartCircular(){
        const canvas = this.chartCanvas.nativeElement.getContext('2d'); // obtenemos el div y le ponemos lo de 2d para que detecte que es un tipo compatible.

        if (canvas) { //creamos chart circular
            new Chart(canvas, {
                type: 'polarArea',
                data: {
                    labels: ['Users', 'Sitios', 'Eventos'],
                    datasets: [
                    {
                        label: 'Cantidad de datos en la base de datos',
                        data: [this.numUsers, this.numRestaurantes, this.numEventos],
                        backgroundColor: [
                            'rgb(255, 99, 132)',
                            'rgb(75, 192, 192)',
                            'rgb(255, 205, 86)'
                        ],
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    },
                    ],
                },
                options: {
                    responsive: true,
                },
            });
        }
    }

    crearChartColumnas(){
        const canvas = this.chartCanvas2.nativeElement.getContext('2d');

        if (canvas) { 
            new Chart(canvas, {
                type: 'bar',
                data: {
                    labels: Object.keys(this.sitiosPorCategoria),
                    datasets: [
                    {
                        label: 'Cantidad de locales guardados con estas etiquetas',
                        data: Object.values(this.cantidadPorCategoria),
                        backgroundColor: [
                           'rgba(255, 99, 132, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            'rgba(255, 205, 86, 0.2)',
                        ],
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1,
                    },
                    ],
                },
                options: {
                    responsive: true,
                },
            });
        }
    }
    sitiosPorCategoria: any = {};
    cantidadPorCategoria: any = {};
    loadData() {
        let usersLoaded = false;
        let placesLoaded = false;
        let eventsLoaded = false;

        //recogemos los datos
        this._userService.getListUsers().subscribe((data: string | any[])=>{
            this.numUsers =  data.length;
            usersLoaded = true;
            this.tryCreateChart(usersLoaded, placesLoaded, eventsLoaded);
        });

        this._mapService.getListPlaces().subscribe((data: any[])=>{
            this.numRestaurantes = data.length;
            placesLoaded = true;
            this.tryCreateChart(usersLoaded, placesLoaded, eventsLoaded);
        
            //chart2
            data.forEach((sitio)=>{
                sitio.category.forEach((categoria: string) => {
                    if(!this.sitiosPorCategoria[categoria]){
                    this.sitiosPorCategoria[categoria] = [];
                    }
                    this.sitiosPorCategoria[categoria].push(sitio);

                    if(!this.cantidadPorCategoria[categoria]){
                        this.cantidadPorCategoria[categoria] = 0;
                    }
                    this.cantidadPorCategoria[categoria]++;
                     
                });
            });
        });

        this._calendarService.getListEvents().subscribe((data: any[]) => {
            this.numEventos = data.length;
            eventsLoaded = true;
            this.tryCreateChart(usersLoaded, placesLoaded, eventsLoaded);
        });
    }

    //cuando todos los datos estén cargados, se carga el grafico
    tryCreateChart(usersLoaded: boolean, placesLoaded: boolean, eventsLoaded: boolean) {
        if (usersLoaded && placesLoaded && eventsLoaded) {
            this.crearChartCircular();
            this.crearChartColumnas();
        }
    }
}
