import { Routes } from '@angular/router';

import { HomeComponent } from './components/organismos/home/home.component';
import { MapaComponent } from './components/mapa/mapa.component';
import { ChartsComponent } from './components/charts/charts.component';
import { FullCalendarComponent } from './components/full-calendar/full-calendar.component';
import { AdminLayoutComponent } from './components/layouts/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './components/layouts/user-layout/user-layout.component';
import { DescubrirComponent } from './components/app-mobile/descubrir/descubrir.component';
import { MapaMobileComponent } from './components/app-mobile/mapa-mobile/mapa-mobile.component';
import { MichiBotComponent } from './components/app-mobile/michi-bot/michi-bot.component';

export const routes: Routes = [
    {
        path: 'admin', 
        component: AdminLayoutComponent, 
        children:[
            {path: 'data', component: HomeComponent},
            {path: 'mapa', component: MapaComponent},
            {path: 'calendar', component: FullCalendarComponent},
            {path: 'modo-user', component: UserLayoutComponent, children:[
                {path: 'descubrir', component: DescubrirComponent},
                {path: 'mapa', component: MapaMobileComponent},
                {path: 'michibot', component: MichiBotComponent},

            ]},
            // {path: 'charts', component: ChartsComponent},
        ]
    },
    {
        path: 'user',
        component: UserLayoutComponent,
        children:[
            {path: 'descubrir', component: DescubrirComponent},
            {path: 'mapa', component: MapaMobileComponent},
        ] //falta
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
