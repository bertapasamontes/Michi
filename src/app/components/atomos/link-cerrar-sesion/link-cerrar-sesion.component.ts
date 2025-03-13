import { Component, ElementRef, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

import {Popover} from 'bootstrap'
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-link-cerrar-sesion',
  imports: [MatIcon],
  templateUrl: './link-cerrar-sesion.component.html',
  styleUrl: './link-cerrar-sesion.component.scss'
})
export class LinkCerrarSesionComponent {
  @ViewChild('popoverBtn', { static: false }) popoverBtn!: ElementRef;
  popoverInstance: Popover | null = null;

  constructor(
    private renderer: Renderer2,
    private _authService: AuthService
  ) {}

  ngAfterViewInit(): void {

    //creamos el popover
    if (this.popoverBtn) {
      const contentElement = this.renderer.createElement('div'); //div que contenedor del popOver
      contentElement.innerHTML = `
          <button class="btn btn-outline-secondary btn-sm" id="cancelarBtn">Cancelar</button>
          <button class="btn btn-danger btn-sm" id="cerrarSesionBtn">Cerrar sesión</button>
      `;

      // creamos el popover con el contenido html generado

      this.popoverInstance = new Popover(this.popoverBtn.nativeElement, {
        html: true,
        trigger: 'click',
        content: contentElement
      });

      //hacemos que los botones del contenido tengan metodos

      this.popoverBtn.nativeElement.addEventListener('shown.bs.popover', () => { //shown.bs.popover evento de bootrap q se dispara cuando el popover está renderizado completamente
        const popoverElement = document.querySelector('.popover-body');
        console.log("Popover mostrado:", popoverElement);
      
        const cancelarBtn = popoverElement?.querySelector('.btn-outline-secondary');
        const cerrarSesionBtn = popoverElement?.querySelector('.btn-danger');
      
        if (cancelarBtn && cerrarSesionBtn) {
          console.log("Botones encontrados");
          cancelarBtn.addEventListener('click', () => this.cerrarPopover());
          cerrarSesionBtn.addEventListener('click', () => this.cerrarSesion());
        } else {
          console.error("No se encontraron los botones dentro del popover");
        }
      });
      
    } else {
      console.error("ERROR: No se encontró el botón del popover.");
    }
  }

cerrarSesion() {
  alert("Cerrando sesión...");
  this._authService.logOut();
  this.cerrarPopover();
  window.location.reload();
}

cerrarPopover() {
  if (this.popoverInstance) {
    this.popoverInstance.hide();
  }
}
}
