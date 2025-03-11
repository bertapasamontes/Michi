import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProfileSmallInfo } from '../../atomos/profile-small-info/ProfileSmallInfo.component';


@Component({
  selector: 'app-mobile-header',
  imports: [RouterLink, RouterLinkActive, MatIcon, ProfileSmallInfo],
  templateUrl: './mobile-header.component.html',
  styleUrl: './mobile-header.component.scss'
})
export class MobileHeaderComponent {

}
