import { Pipe, PipeTransform } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { combineLatest, exhaustMap, Observable, of } from 'rxjs'
import { ITextSynthesisRequest } from './models'

@Pipe({
  name: 'textSynthesis$',
})
export class TextSynthesisPipe implements PipeTransform {
  private characterCountTranslationKey =
    'PayAsYouGo.TextSyntheses.CharacterCount'
  private priceTranslationKey = 'PayAsYouGo.TextSyntheses.Price'

  private characterCountTranslation$: Observable<string>
  private priceTranslation$: Observable<string>

  constructor(private translate: TranslateService) {
    this.characterCountTranslation$ = this.translate.get(
      this.characterCountTranslationKey
    )
    this.priceTranslation$ = this.translate.get(this.priceTranslationKey)
  }

  transform(
    value: ITextSynthesisRequest,
    ...args: unknown[]
  ): Observable<string> {
    return combineLatest([
      this.characterCountTranslation$,
      this.priceTranslation$,
    ]).pipe(
      exhaustMap(([characterCountTranslation, priceTranslation]) => {
        const characterCount = `${characterCountTranslation}: ${value.characterCount}`
        const price = `${priceTranslation}: ${value.price}`

        const summary = `${characterCount} - ${price}`

        return of(summary)
      })
    )
  }
}
