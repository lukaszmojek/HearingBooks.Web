import { createFeatureSelector, createSelector } from "@ngrx/store";
import { featureName, IUIState } from "./ui.reducer";

export const selectAuthFeature = createFeatureSelector<IUIState>(featureName)

export const selectIsSideMenuOpened = createSelector(
  selectAuthFeature,
  state => state.isSideMenuOpened
)
