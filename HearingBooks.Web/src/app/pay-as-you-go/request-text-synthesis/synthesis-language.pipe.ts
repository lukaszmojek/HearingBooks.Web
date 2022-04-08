import { Pipe, PipeTransform } from '@angular/core';
import { ISynthesisLanguage } from './models';

@Pipe({
  name: 'synthesisLanguage'
})
export class SynthesisLanguagePipe implements PipeTransform {

  transform(value: ISynthesisLanguage, ...args: unknown[]): unknown {
    return `${value.symbol} - ${value.name}`;
  }
}
