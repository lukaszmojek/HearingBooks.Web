import { Pipe, PipeTransform } from '@angular/core';
import { ISynthesisVoice } from './models';

@Pipe({
  name: 'synthesisVoice'
})
export class SynthesisVoicePipe implements PipeTransform {

  transform(value: ISynthesisVoice, ...args: unknown[]): unknown {
    return `${value.name} - ${value.gender}`;
  }
}
