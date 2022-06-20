import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { AcrylicService } from '../acrylic/acrylic.service'
import { CardType } from './card-type'

@Component({
  selector: 'hb-card',
  template: `
    <mat-card
      class="hb-card"
      [ngClass]="{
        acrylic: isAcryclic,
        transparent: isTransparent,
        border: border,
        'mat-elevation-z10': shouldHaveElevation
      }">
      <mat-card-title *ngIf="!!titleTranslationKey">
        {{ titleTranslationKey | translate }}
      </mat-card-title>

      <mat-divider *ngIf="shouldDisplayDivider"></mat-divider>
      <mat-progress-bar *ngIf="shouldDisplayProgressBar" mode="query"></mat-progress-bar>

      <mat-card-content [ngClass]="{ 'margin-top-xxl': !!titleTranslationKey }">
        <ng-content></ng-content>
      </mat-card-content>
    </mat-card>
  `,
  styles: [
    `
      @use '../../../styles/bootstrap.scss';

      :host {
        width: 100%;
        height: 100%;

        .mat-card {
          height: 94%;
        }

        .mat-card-title {
          @include bootstrap.flex-set;
        }

        .mat-divider {
          height: 4px;
          border-top-width: 4px;
        }

        .mat-progress-bar {
          position: absolute;
          left: 0;
        }

        .mat-card-content {
          padding-bottom: bootstrap.$spacing-padding-xl;
        }

        .margin-top-xxl {
          margin-top: bootstrap.$spacing-margin-xxl;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @Input() titleTranslationKey: string = ''
  @Input() type: CardType = CardType.Material
  @Input() divider: boolean = false
  @Input() border: boolean = false
  @Input() elevation: boolean = false
  @Input() showLoadingIndicator: boolean = false
  @Input() isLoading: boolean | null = false

  get shouldHaveElevation(): boolean {
    return this.isMaterial && this.elevation
  }

  get shouldDisplayDivider(): boolean {
    return !!this.titleTranslationKey && this.divider && !this.shouldDisplayProgressBar
  }

  get shouldDisplayProgressBar(): boolean {
    return this.showLoadingIndicator && this.isLoading!
  }

  get isAcryclic(): boolean {
    return this.acrylic.isAcrylic(this.type)
  }

  get isTransparent(): boolean {
    return this.acrylic.isTransparent(this.type)
  }

  get isMaterial(): boolean {
    return this.acrylic.isMaterial(this.type)
  }

  constructor(private acrylic: AcrylicService) { }
}


