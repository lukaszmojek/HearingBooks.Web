import { Injectable } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {
  private drawer!: MatDrawer;
  private isDrawerInitialized = false

  constructor() { }

  public setDrawer(drawer: MatDrawer): void {
    if (!!drawer && !this.isDrawerInitialized) {
      this.drawer = drawer
      this.isDrawerInitialized = true
    }
  } 

  public toggleDrawer(): boolean {
    if (!this.isDrawerInitialized) {
      return false
    }

    this.drawer.toggle()
    return this.drawer.opened
  }
}
