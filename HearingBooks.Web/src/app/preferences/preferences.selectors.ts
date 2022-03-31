import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CardType } from "../shared/card/card.component";
import { featureName, IPreferencesState } from "./preferences.reducer";

export const selectAuthFeature = createFeatureSelector<IPreferencesState>(featureName)

export const selectIsAcrylicEnabled = createSelector(
  selectAuthFeature,
  state => state.isAcrylicEnabled
)

export const selectMainCardType = createSelector(
  selectAuthFeature,
  state => state.isAcrylicEnabled
    ? CardType.Acrylic
    : CardType.Normal
)

export const selectInnerCardType = createSelector(
  selectAuthFeature,
  state => state.isAcrylicEnabled
    ? CardType.Transparent
    : CardType.Normal
)