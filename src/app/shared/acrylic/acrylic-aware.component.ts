import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { CardType } from "../card/card-type"
import StoreConnectedComponent from '../store-connected.component'
import { AcrylicService } from './acrylic.service'

@Component({
  template: '',
})
export default abstract class AcrylicAwareComponent<T> extends StoreConnectedComponent<T> {
  // @Input()
  // public mainCardTypeSelector: CardTypeSelectorType
  // @Input()
  // public innerCardTypeSelector: CardTypeSelectorType
  // @Input()
  // public acrylicEnabledSelectorType: AcrylicEnabledSelectorType

  public mainCardType: CardType
  public innerCardType: CardType
  public isAcrylicEnabled: boolean

  //TODO: Check what the hell is going on with selectors
  constructor(store$: Store<T>, protected acrylic: AcrylicService) {
    super(store$)
    this.safeSelect$(this.acrylic.mainCardTypeSelector).subscribe(
      mainCardType => (this.mainCardType = mainCardType!)
    )
    this.safeSelect$(this.acrylic.innerCardTypeSelector).subscribe(
      innerCardType => (this.innerCardType = innerCardType!)
    )
    this.safeSelect$(this.acrylic.isAcrylicEnabledSelector).subscribe(isAcrylicEnabled => {
      this.isAcrylicEnabled = isAcrylicEnabled!
    })
  }
}
