import { Component } from '@angular/core'

@Component({
  selector: 'hb-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.scss'],
})
export class MainAppComponent {
  public isLoggedIn: boolean = true

  constructor() {}
}
