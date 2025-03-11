import { Routes } from '@angular/router';

import { HomeComponent } from './components/organismos/home/home.component';
import { MapaComponent } from './components/mapa/mapa.component';
import { FullCalendarComponent } from './components/full-calendar/full-calendar.component';
import { AdminLayoutComponent } from './components/layouts/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './components/layouts/user-layout/user-layout.component';
import { DescubrirComponent } from './components/organismos/mobile-descubrir/descubrir.component';
import { MapaMobileComponent } from './components/organismos/mobile-mapa/mapa-mobile.component';
import { MichiBotComponent } from './components/organismos/mobile-michi-bot/michi-bot.component';
import { InicioSesionComponent } from './components/moleculas/inicio-sesion/inicio-sesion.component';
import { MobilePerfilComponent } from './components/organismos/mobile-perfil/mobile-perfil.component';

import { AuthGuard } from './_helpers/authGuard/auth.guard';
import { InfoProductoComponent } from './components/moleculas/info-producto/info-producto.component';




export const routes: Routes = [
    {
        path: 'admin', 
        component: AdminLayoutComponent, canActivate: [AuthGuard], data: { rolEsperado: 'admin' }, 
        children:[
            {path: 'data', component: HomeComponent,  data: { rolEsperado: 'admin' }},
            {path: 'mapa', component: MapaComponent},
            // {path: 'calendar', component: FullCalendarComponent},
            // {path: 'modo-user', component: UserLayoutComponent, children:[
            //     {path: 'descubrir', component: DescubrirComponent, children:[
            //         {path: ':id', component: InfoProductoComponent},
            //     ]},
            //     {path: 'mapa', component: MapaMobileComponent},
            //     {path: 'michibot', component: MichiBotComponent},
            //     {path: 'perfil', component: MobilePerfilComponent},

            // ]},
            // {path: 'charts', component: ChartsComponent},
        ]
    },
    {
        path: 'user',
        component: UserLayoutComponent, canActivate: [AuthGuard], data: { rolEsperado: 'viewer' },
        children:[
            {path: 'descubrir', component: DescubrirComponent},
            {path: 'mapa', component: MapaMobileComponent},
            {path: 'michibot', component: MichiBotComponent},
            {path: 'perfil', component: MobilePerfilComponent},
        ] //falta
    },
    { path: 'login', pathMatch:'full', component:InicioSesionComponent},
    { path: '', redirectTo: 'admin/data', pathMatch: 'full'}, //hay que cambiarlo a que se vaya la app. pero que apse antes por un inicio de sesión
    { path: '**', redirectTo:"", pathMatch:'full', component:AdminLayoutComponent}
];
