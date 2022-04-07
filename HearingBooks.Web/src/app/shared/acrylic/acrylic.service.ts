import { Injectable } from '@angular/core'
import { selectInnerCardType, selectIsAcrylicEnabled, selectMainCardType } from 'src/app/preferences/preferences.selectors'
import { CardType } from "../card/card-type"
import { AcrylicEnabledSelectorType } from "./acrylic-enabled-selector.type"
import { InnerCardTypeSelectorType, MainCardTypeSelectorType } from './card-type-selector.type'

// TODO: Consider moving that to store
@Injectable({
  providedIn: 'root',
})
export class AcrylicService {
  private _isInitialized: boolean = false

  private _mainCardTypeSelector: MainCardTypeSelectorType = selectMainCardType
  private _innerCardTypeSelector: InnerCardTypeSelectorType = selectInnerCardType
  private _isAcrylicEnabledSelector: AcrylicEnabledSelectorType = selectIsAcrylicEnabled

  public get mainCardTypeSelector(): MainCardTypeSelectorType {
    return this._mainCardTypeSelector
  }

  public get innerCardTypeSelector(): InnerCardTypeSelectorType {
    return this._innerCardTypeSelector
  }

  public get isAcrylicEnabledSelector(): AcrylicEnabledSelectorType {
    return this._isAcrylicEnabledSelector
  }

  constructor() { }

  public initialize(
    mainCardTypeSelector: any,
    innerCardTypeSelector: any,
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
