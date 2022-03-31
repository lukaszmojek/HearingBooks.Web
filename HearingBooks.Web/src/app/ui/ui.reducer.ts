import { createFeature, createReducer, on } from '@ngrx/store';
import { UIActions } from './ui.actions';

export const featureName = 'ui'

const initialState: IUIState = {
  isSideMenuOpened: false
}

export interface IUIState {
  isSideMenuOpened: boolean
}

const reducer = createReducer(
  initialState,
  on(UIActions.toggleSideMenu, (state, { isSideMenuOpened }) => ({
    ...state,
    isSideMenuOpened: isSideMenuOpened
  })),
)

export const uiFeature = createFeature({
  name: featureName,
  reducer: reducer
})