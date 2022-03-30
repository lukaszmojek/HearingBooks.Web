import { Component, Input } from '@angular/core';

@Component({
  selector: 'hb-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  @Input() drawer: any

  public isLoggedIn: boolean = true

  constructor() { }
}
