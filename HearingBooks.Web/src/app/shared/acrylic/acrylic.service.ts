import { Injectable } from '@angular/core'
import { CardType } from '../card/card.component'
import { AcrylicEnabledSelectorType } from "./acrylic-enabled-selector.type"
import { CardTypeSelectorType } from "./card-type-selector.type"

// TODO: Consider moving that to store
@Injectable({
  providedIn: 'root',
})
export class AcrylicService {
  private _isInitialized: boolean = false

  private _mainCardTypeSelector: CardTypeSelectorType
  private _innerCardTypeSelector: CardTypeSelectorType
  private _isAcrylicEnabledSelector: AcrylicEnabledSelectorType

  public get mainCardTypeSelector(): CardTypeSelectorType {
    return this._mainCardTypeSelector
  }

  public get innerCardTypeSelector(): CardTypeSelectorType {
    return this._innerCardTypeSelector
  }

  public get isAcrylicEnabledSelector(): AcrylicEnabledSelectorType {
    return this._isAcrylicEnabledSelector
  }

  constructor() { }

  public initialize(
    mainCardTypeSelector: CardTypeSelectorType,
    innerCardTypeSelector: CardTypeSelectorType,
    isAcrylicEnabledSelector: AcrylicEnabledSelectorType
  ) {
    if (this._isInitialized) {
      throw new Error("Cannot initialize AcrylicService more than 1 time!")
    }

    this._mainCardTypeSelector = mainCardTypeSelector
    this._innerCardTypeSelector = innerCardTypeSelector
    this._isAcrylicEnabledSelector = isAcrylicEnabledSelector
  }

  isAcrylic(cardType: CardType): boolean {
    return cardType === CardType.Acrylic
  }

  isTransparent(cardType: CardType): boolean {
    return cardType === CardType.Transparent
  }

  isMaterial(cardType: CardType): boolean {
    return cardType === CardType.Material
  }
}
