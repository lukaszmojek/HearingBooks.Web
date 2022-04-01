import { Injectable } from '@angular/core';
import { CardType } from '../card/card.component';

// TODO: Consider moving that to store
@Injectable({
  providedIn: 'root'
})
export class AcrylicService {
  public isAcrylic(cardType: CardType): boolean {
    return cardType === CardType.Acrylic
  }

  public isTransparent(cardType: CardType): boolean {
    return cardType === CardType.Transparent
  }

  public isMaterial(cardType: CardType): boolean {
    return cardType === CardType.Material
  }

  constructor() { }
}
