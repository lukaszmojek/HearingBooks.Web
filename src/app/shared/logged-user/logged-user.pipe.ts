import { Pipe, PipeTransform } from '@angular/core';
import { IUser } from 'src/app/auth/models';

@Pipe({
  name: 'loggedUser'
})
export class LoggedUserPipe implements PipeTransform {

  transform(value: IUser, ...args: unknown[]): unknown {
    if (!value) {
      return ''
    }

    return `${value.firstName} | ${value.balance} USD`
  }
}
