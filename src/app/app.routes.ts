import { Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { MapaComponent } from './components/mapa/mapa.component';
import { ChartsComponent } from './components/charts/charts.component';
import { FullCalendarComponent } from './components/full-calendar/full-calendar.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';

export const routes: Routes = [
    {
        path: 'admin', 
        component: AdminLayoutComponent, 
        children:[
            {path: 'admin/data', component: HomeComponent},
            {path: 'admin/mapa', component: MapaComponent},
            {path: 'admin/calendar', component: FullCalendarComponent},
        ]
    },
    {
        path: 'user',
        component: UserLayoutComponent,
        children:[] //falta
    },
    { path: '', redirectTo: 'admin/data', pathMatch: 'full'}, //hay que cambiarlo a que se vaya la app. pero que apse antes por un inicio de sesión
    { path: '**', redirectTo:"", pathMatch:'full', component:AdminLayoutComponent}



    // { path: 'home', component: HomeComponent},
    // { path: '',   redirectTo: '/home', pathMatch: 'full'},
    // // { path: 'edit/:id', component: AddUserComponent},
    // { path: 'mapa', component: MapaComponent},
    // { path: 'calendar', component: FullCalendarComponent},
    // { path: 'charts', component: ChartsComponent},
    // { path: '**', redirectTo:"", pathMatch:'full', component: HomeComponent},


];
