import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import {
  selectMainCardType,
  selectInnerCardType,
  selectIsAcrylicEnabled,
} from 'src/app/preferences/preferences.selectors'
import { CardType } from '../card/card.component'
import { IApplicationState } from '../state'
import StoreConnectedComponent from '../store-connected.component'

@Component({
  template: '',
})
export default abstract class AcrylicAwareComponent extends StoreConnectedComponent<IApplicationState> {
  public mainCardType: CardType
  public innerCardType: CardType
  public isAcrylicEnabled: boolean

  constructor(store$: Store<IApplicationState>) {
    super(store$)
    this.safeSelect$(selectMainCardType).subscribe(
      mainCardType => (this.mainCardType = mainCardType)
    )
    this.safeSelect$(selectInnerCardType).subscribe(
      innerCardType => (this.innerCardType = innerCardType)
    )
    this.safeSelect$(selectIsAcrylicEnabled).subscribe(isAcrylicEnabled => {
      this.isAcrylicEnabled = isAcrylicEnabled
    })
  }
}
