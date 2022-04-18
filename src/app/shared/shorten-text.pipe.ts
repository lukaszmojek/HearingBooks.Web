import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenText'
})
export class ShortenTextPipe implements PipeTransform {
  transform(value: string, maxCharacters: number, ...args: unknown[]): unknown {
    return value.slice(0, maxCharacters) + '...'
  }
}
