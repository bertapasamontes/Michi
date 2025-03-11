import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() {
    // Pedir permiso al cargar la web
    if ("Notification" in window) {
      Notification.requestPermission().then(permission => {
        console.log("Permiso de notificación:", permission);
      });
    }
  }

  mostrarNotificacion(titulo: string, mensaje: string) {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(titulo, { body: mensaje });
    }
  }
}
