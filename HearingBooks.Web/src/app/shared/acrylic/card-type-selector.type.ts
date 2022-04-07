import { DefaultProjectorFn, MemoizedSelector } from '@ngrx/store';
import { CardType } from '../card/card.component';


export type CardTypeSelectorType = MemoizedSelector<object, CardType, DefaultProjectorFn<CardType>>;
