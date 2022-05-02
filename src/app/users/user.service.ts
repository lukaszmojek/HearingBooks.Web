import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiEndpoints } from '../shared/api-endpoints';
import { SnackbarNotificationsService } from '../shared/notifications/snackbar-notifications.service';
import { SharedModule } from '../shared/shared.module';
import { User, RegisterUserDto, ChangeUserDetailsDto, ChangePasswordDto } from './models';

@Injectable({
  providedIn: SharedModule
})
export class UserService {
  constructor(private http: HttpClient, private notifications: SnackbarNotificationsService) { }

  public getUserById(userId: string): Observable<User> {
    const url = ApiEndpoints.users.getById(userId)

    return this.http.get<User>(url)
  }

  public getAllUsers(): Observable<User[]> {
    const url = ApiEndpoints.users.getAll

    return this.http.get<User[]>(url)
  }

  public registerUser(registerUserDto: RegisterUserDto): Observable<any> {
    const url = ApiEndpoints.users.register


    return this.http.post(url, registerUserDto).pipe(tap(_ => {
      this.notifications.showSuccessNotification('Zarejestrowano pomyślnie')
    }))
  }

  public changeUserDetails(changeUserDetailsDto: ChangeUserDetailsDto): Observable<any> {
    const url = ApiEndpoints.users.changeDetails

    return this.http.post(url, changeUserDetailsDto).pipe(tap(_ => {
      this.notifications.showSuccessNotification("Edycja danych przebiegła pomyślnie")
    }))
  }

  public changePassword(userId: string, oldPassword: string, newPassword: string): Observable<any> {
    const url = ApiEndpoints.users.changePassword

    const data: ChangePasswordDto = {
      userId,
      oldPassword,
      newPassword
    }

    return this.http.post(url, data).pipe(tap(_ => {
      this.notifications.showSuccessNotification('Zmiana hasłą przebiegła pomyślnie')
    }))
  }
}
