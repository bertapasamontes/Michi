import { Component, Input } from '@angular/core';
import { User } from '../../../interfaces/users';

@Component({
  selector: 'app-profile-big-info',
  imports: [],
  templateUrl: './profile-big-info.component.html',
  styleUrl: './profile-big-info.component.scss'
})
export class ProfileBigInfoComponent {
  @Input() usuarioLogueado!: User;
}
