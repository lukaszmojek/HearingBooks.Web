import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { CardType } from '../card/card.component'
import StoreConnectedComponent from '../store-connected.component'
import { AcrylicService } from './acrylic.service'

@Component({
  template: '',
})
export default abstract class AcrylicAwareComponent<T> extends StoreConnectedComponent<T> {
  public mainCardType: CardType
  public innerCardType: CardType
  public isAcrylicEnabled: boolean

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
