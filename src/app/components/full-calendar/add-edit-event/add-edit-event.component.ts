import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { CalendarService } from '../../../services/calendar/calendar.service';
import { Event } from '../../../interfaces/event';
import { ToastrService } from 'ngx-toastr';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule, MatHint } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-edit-event',
  imports: [MatIcon, ReactiveFormsModule, MatDatepickerModule, MatHint, MatNativeDateModule, MatFormFieldModule],
  templateUrl: './add-edit-event.component.html',
  styleUrl: './add-edit-event.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddEditEventComponent {

  formEditEvent: FormGroup;
  operacion: string = 'Añadir nuevo'


  constructor(
    //matDialog
    public _matDialogRef: MatDialogRef<AddEditEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any, //recibir data

    //formulario
    private formBuilder: FormBuilder,

    //servicio calendario
    private _calendarService: CalendarService,

    //toast
    private toastr: ToastrService
  ){
    //formulario
    this.formEditEvent = formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      start: [null, Validators.required],
      end: [null],
    })
  }

  ngOnInit(){
    if(this.data.id != undefined){
      this.operacion = 'Editar';
      console.log("id:",this.data.id);

      this.getEvent(this.data.id)
    } else console.log("id: ", this.data.id);
    console.log("data: ", this.data);
  }

  volver(){
    this._matDialogRef.close();
  }

  addEvent(){
    const EventoNuevo: Event = {
      title: this.formEditEvent.value.title,
      description: this.formEditEvent.value.description,
      start: this.formEditEvent.value.start,
      end: this.formEditEvent.value.end,      
    }
    console.log(EventoNuevo);
    // this.loading = true;
    if(this.data.id !== undefined){
      //editar evento 
      EventoNuevo._id = this.data.id;
      console.log("id evento dentro de addEvent()", EventoNuevo._id);
      this._calendarService.updateEvent(this.data.id, EventoNuevo).subscribe((datos)=>{
        console.log("datos: ", datos);
        this.toastr.warning(`Evento ha sido actualizado`, 'Evento editado')
      })

    } else{
      console.log(this.data.id);
      //añadir nuevo evento
      this._calendarService.saveEvent(EventoNuevo).subscribe(()=>{
        this.toastr.success(`Evento ha sido creado y añadido exitosamente`, 'Evento añadido')
      })
    }
    // this.loading = false;
    this._matDialogRef.close();

    this._matDialogRef.close(true);
  }

  getEvent(id:number){
    this._calendarService.getEvent(id).subscribe((data:Event)=>{
      console.log('obteniendo datos del evento');
        console.log(data);
        // this.loading=false;
        this.formEditEvent.patchValue({
          title: data.title,
          description: data.description,
          start: data.start,
          end: data.end
        })
    })
  }

  deleteEvent(){
    if(this.data.id != undefined){
    this._calendarService.deleteEvent(this.data.id).subscribe(()=>{
      this.toastr.warning(`Evento eliminado correctamente`, `Evento eliminado`);
    })
    this._matDialogRef.close();
    this._matDialogRef.close(true);

    }
}
}
