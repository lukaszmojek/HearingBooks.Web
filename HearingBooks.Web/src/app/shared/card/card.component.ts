import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'hb-card',
  template: `
    <mat-card [ngClass]="{'acrylic': isAcryclic, 'transparent': isTransparent, 'border': border}">
      <mat-card-title *ngIf="!!titleTranslationKey">
        {{ titleTranslationKey | translate }}
      </mat-card-title>

      <mat-divider *ngIf="!!titleTranslationKey && divider"></mat-divider>

      <mat-card-content>
        <ng-content></ng-content>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    @use "../../../styles/bootstrap.scss";

    :host {
      width: 100%;
      height: 100%;

      .mat-card-title {
        @include bootstrap.flex-set
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  @Input() titleTranslationKey: string = ''
  @Input() type: CardType = CardType.Normal
  @Input() divider: boolean = false
  @Input() border: boolean = false

  public get isAcryclic(): boolean {
    return this.type === CardType.Acrylic
  }

  public get isTransparent(): boolean {
    return this.type === CardType.Transparent
  }

  constructor() { }
}

export enum CardType {
  Normal,
  Acrylic,
  Transparent
}