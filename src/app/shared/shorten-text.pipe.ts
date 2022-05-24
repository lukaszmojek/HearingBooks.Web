import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenText'
})
export class ShortenTextPipe implements PipeTransform {
  transform(textToShorten: string, maxCharacters: number, ...args: unknown[]): unknown {
    const shouldShortenText = textToShorten.length > maxCharacters

    return shouldShortenText
      ? `${textToShorten.slice(0, maxCharacters)}...`
      : textToShorten
  }
}
