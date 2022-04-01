import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ITextSynthesisRequest } from './models';

@Component({
  selector: 'hb-text-synthesis-request',
  templateUrl: './text-synthesis-request.component.html',
  styleUrls: ['./text-synthesis-request.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextSynthesisRequestComponent {
  @Input() request: ITextSynthesisRequest
  
  constructor() { }
}
