import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'hb-card',
  template: `
    <mat-card [ngClass]="{'acrylic': isAcryclic, 'transparent': isTransparent, 'border': border, 'mat-elevation-z10': shouldHaveElevation}">
      <mat-card-title *ngIf="!!titleTranslationKey">
        {{ titleTranslationKey | translate }}
      </mat-card-title>

      <mat-divider *ngIf="!!titleTranslationKey && divider"></mat-divider>

      <mat-card-content [ngClass]="{'margin-top-xxl': !!titleTranslationKey}">
        <ng-content></ng-content>
      </mat-card-content>
    </mat-card>
  `,
  styles: [`
    @use "../../../styles/bootstrap.scss";

    :host {
      width: 100%;
      height: 100%;

      .mat-card {
        height: 94%;
      }

      .mat-card-title {
        @include bootstrap.flex-set;
      }

      .margin-top-xxl {
        margin-top: bootstrap.$spacing-margin-xxl;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent {
  @Input() titleTranslationKey: string = ''
  @Input() type: CardType = CardType.Material
  @Input() divider: boolean = false
  @Input() border: boolean = false
  @Input() elevation: boolean = false

  public get shouldHaveElevation(): boolean {
    return this.isMaterial && this.elevation
  }

  public get isAcryclic(): boolean {
    return this.type === CardType.Acrylic
  }

  public get isTransparent(): boolean {
    return this.type === CardType.Transparent
  }

  public get isMaterial(): boolean {
    return this.type === CardType.Material
  }

  constructor() { }
}

export enum CardType {
  Material,
  Acrylic,
  Transparent
}