import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { IPreferencesState } from 'src/app/preferences/preferences.reducer';
import { selectIsAcrylicEnabled } from 'src/app/preferences/preferences.selectors';
import { SharedModule } from '../shared.module';
import StoreConnectedComponent from '../store-connected.component';
import { NotificationType } from './notification-type.enum';
import { INotificationsService } from './notifications-service.interface';

@Injectable({
  providedIn: SharedModule
})
export class SnackbarNotificationsService extends StoreConnectedComponent<IPreferencesState> implements INotificationsService {
  private horizontalPosition: MatSnackBarHorizontalPosition = 'right'
  private verticalPosition: MatSnackBarVerticalPosition = 'bottom'
  private action: string = 'OK'
  private isAcrylicEnabled: boolean
  private duration = 15000

  constructor(private snackbar: MatSnackBar, store$: Store<IPreferencesState>) {
    super(store$)
    this.safeSelect$(selectIsAcrylicEnabled).subscribe(isAcrylicEnabled => {
      this.isAcrylicEnabled = isAcrylicEnabled
    })
  }

  showSuccessNotification(message: string): void {
    this.showNotification(message, NotificationType.Success)
  }

  showErrorNotification(message: string): void {
    this.showNotification(message, NotificationType.Error)
  }

  showNotification(message: string, type: NotificationType = NotificationType.Information): void {
    const notificationClasses = this.getNotificationClasses(type)

    this.snackbar.open(message, this.action, {
      verticalPosition: this.verticalPosition,
      horizontalPosition: this.horizontalPosition,
      panelClass: notificationClasses,
      duration: this.duration
    })
  }

  private getNotificationClasses(type: NotificationType): string[] {
    const baseClasses = this.isAcrylicEnabled ? ['acrylic-notification'] : ['material']

    if (!this.isAcrylicEnabled) {
      return baseClasses
    }

    const typeClasses = this.getAcrylicNotificationClasses(type)

    return [...baseClasses, ...typeClasses]
  }

  private getAcrylicNotificationClasses(type: NotificationType): string[] {
    if (type == NotificationType.Success) return ['acrylic-notification--success']
    if (type == NotificationType.Error) return ['acrylic-notification--error']
    return []
  }
}
