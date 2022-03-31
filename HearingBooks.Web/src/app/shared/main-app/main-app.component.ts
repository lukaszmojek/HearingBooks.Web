import { AfterViewInit, Component, ViewChild } from '@angular/core'
import { MatDrawer } from '@angular/material/sidenav'
import { ToolbarService } from '../toolbar/toolbar.service'

@Component({
  selector: 'hb-main-app',
  templateUrl: './main-app.component.html',
  styleUrls: ['./main-app.component.scss'],
})
export class MainAppComponent implements AfterViewInit {
  @ViewChild('drawer')
  public drawer!: MatDrawer
  
  constructor(private toolbar: ToolbarService) { }
  
  ngAfterViewInit(): void {
    this.toolbar.setDrawer(this.drawer)
  }
}
