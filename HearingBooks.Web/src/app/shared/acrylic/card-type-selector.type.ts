import { DefaultProjectorFn, MemoizedSelector } from '@ngrx/store';
import { CardType } from "../card/card-type";


export type MainCardTypeSelectorType = MemoizedSelector<object, CardType.Material | CardType.Acrylic, DefaultProjectorFn<CardType>>;
export type InnerCardTypeSelectorType = MemoizedSelector<object, CardType.Material | CardType.Transparent, DefaultProjectorFn<CardType>>;
