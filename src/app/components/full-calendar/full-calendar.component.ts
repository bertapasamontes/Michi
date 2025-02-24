import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventInput } from '@fullcalendar/core'; // useful for typechecking

//plugins de FullCalendar
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es'
import { AddEditEventComponent } from './add-edit-event/add-edit-event.component';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { CalendarService } from '../../services/calendar/calendar.service';
import { Event } from '../../interfaces/event';

@Component({
    selector: 'app-full-calendar',
    imports: [FullCalendarModule, CommonModule, MatIcon],
    templateUrl: './full-calendar.component.html',
    styleUrl: './full-calendar.component.scss'
})
export class FullCalendarComponent {

    constructor(
        private _matDialog: MatDialog,
        private _calendarService: CalendarService
    ){

    }
    @ViewChild('calendario') calendarComponent?: FullCalendarComponent;


    calendarOptions: CalendarOptions = {
        initialView: 'dayGridMonth',
        plugins: [dayGridPlugin, interactionPlugin],
        events:[],
        locale: esLocale,
        weekends: true, // findes visibles
        eventClick: this.abrirEditEvent.bind(this)
    };
    toggleWeekends() {
        this.calendarOptions.weekends = !this.calendarOptions.weekends // toggle the boolean!
    }

    abrirEditEvent(info:any):void{
        const dialogo = this._matDialog.open(AddEditEventComponent, {
            width: '900px',
            data: {
            id: info.event._def.publicId,
            }
        });

        dialogo.afterClosed().subscribe((result)=>{
            console.log('dialogo Edit event cerrado');
            if(result){
            console.log("va bieeen");
            this.getListEvents();
            }else{
            console.log('somethign is wrong')
            }
        })
    }
    abrirAddEvent():void{
        const dialogo = this._matDialog.open(AddEditEventComponent, {
            width: '900px',
            data:{}
        });

        dialogo.afterClosed().subscribe((result)=>{
            console.log('dialogo cerrado');
            if(result){
            console.log("va bieeen");
            this.getListEvents();
            }else{
            console.log('somethign is wrong')
            }
        })
    }

    ngOnInit() {
        console.log("eventos impresos");
        this.getListEvents();
    }

    getListEvents(){
        this._calendarService.getListEvents().subscribe((data: Event[]) => {
            console.log("Eventos recibidos:", data);
    
            //damos el formato de Event.ts
            const eventosFullCalendar: Event[] = data.map(evento => ({
                id:  evento._id ? evento._id?.toString() : '', 
                title: evento.title,
                start: evento.start,
                end: evento.end,  
                description: evento.description
            }));
    
            //asignamos los valores a los eventos del calendario
            this.calendarOptions = {
                ...this.calendarOptions,
                events: eventosFullCalendar
            };
        });
    }

}
