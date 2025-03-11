import { Component, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import {ClipboardModule} from '@angular/cdk/clipboard';

@Component({
  selector: 'app-btn-clipboard',
  imports: [MatIcon, ClipboardModule],
  templateUrl: './btn-clipboard.component.html',
  styleUrl: './btn-clipboard.component.scss'
})
export class BtnClipboardComponent {

  @Input() id: number = 0;

}
