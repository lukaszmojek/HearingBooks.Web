import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dialogueSynthesis'
})
export class DialogueSynthesisPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return value.replace(/\n/g, '<br/>');
  }
}
