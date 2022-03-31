import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'hb-card',
  template: `
    <mat-card [ngClass]="{acrylic: acrylic}">
      <ng-content></ng-content>
    </mat-card>
  `,
  styles: [
    `
    @use "../../../styles/bootstrap.scss";

    :host {
      width: 100%;
      height: 100%;

      .mat-card.actylic {
        @include bootstrap.acrylic-set()
      }
    }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  @Input() acrylic: boolean = false

  constructor() { }
}
