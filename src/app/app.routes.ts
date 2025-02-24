import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { MapaComponent } from './components/mapa/mapa.component';
import { ChartsComponent } from './components/charts/charts.component';
import { FullCalendarComponent } from './components/full-calendar/full-calendar.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: '',   redirectTo: '/home', pathMatch: 'full'},
    // { path: 'edit/:id', component: AddUserComponent},
    { path: 'mapa', component: MapaComponent},
    { path: 'calendar', component: FullCalendarComponent},
    { path: 'charts', component: ChartsComponent},
    { path: '**', redirectTo:"", pathMatch:'full', component: HomeComponent},


];
