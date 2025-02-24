import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./components/shared/header/header.component";
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import { ToastrModule } from 'ngx-toastr';

@Component({
    selector: 'app-root',
    imports: [CommonModule, RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  title = '8.inprocode';
}
