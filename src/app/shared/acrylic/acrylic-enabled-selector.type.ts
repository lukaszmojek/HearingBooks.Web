import { DefaultProjectorFn, MemoizedSelector } from '@ngrx/store';


export type AcrylicEnabledSelectorType = MemoizedSelector<object, boolean, DefaultProjectorFn<boolean>>;
