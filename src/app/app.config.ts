import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatDialogRef } from '@angular/material/dialog';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';

import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideHttpClient(), provideAnimations(), // required animations providers
    provideToastr({positionClass: 'toast-bottom-right'}), MatDatepickerModule, MatNativeDateModule, provideNativeDateAdapter(), provideCharts(withDefaultRegisterables()), importProvidersFrom([SweetAlert2Module.forRoot()])]
};
