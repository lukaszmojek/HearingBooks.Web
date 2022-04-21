import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { IPreferencesState } from 'src/app/preferences/preferences.reducer';
import { selectIsAcrylicEnabled } from 'src/app/preferences/preferences.selectors';
import { SharedModule } from '../shared.module';
import StoreConnectedComponent from '../store-connected.component';
import { INotificationsService } from './notifications-service.interface';

@Injectable({
  providedIn: SharedModule
})
export class SnackbarNotificationsService extends StoreConnectedComponent<IPreferencesState> implements INotificationsService {
  private horizontalPosition: MatSnackBarHorizontalPosition = 'right'
  private verticalPosition: MatSnackBarVerticalPosition = 'bottom'
  private action: string = 'OK'
  private isAcrylicEnabled: boolean

  private get panelClass(): string[] {
    return this.isAcrylicEnabled ? ['acrylic-notification'] : ['material']
  }

  constructor(private snackbar: MatSnackBar, store$: Store<IPreferencesState>) {
    super(store$)
    this.safeSelect$(selectIsAcrylicEnabled).subscribe(isAcrylicEnabled => {
      this.isAcrylicEnabled = isAcrylicEnabled
    })
  }

  showNotification(message: string): void {
    this.snackbar.open(message, this.action, { verticalPosition: this.verticalPosition, horizontalPosition: this.horizontalPosition, panelClass: this.panelClass })
  }
}
