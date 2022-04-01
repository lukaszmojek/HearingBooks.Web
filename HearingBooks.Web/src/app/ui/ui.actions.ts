import { createAction, props } from '@ngrx/store'

const toggleSideMenu = createAction(
  '[UI] Side menu toggled',
  props<{ isSideMenuOpened: boolean }>()
)

export const UIActions = {
  toggleSideMenu,
}
