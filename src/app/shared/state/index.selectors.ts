import { createSelector } from "@ngrx/store";
import * as languages from "src/app/languages/languages.selectors";
import * as textSyntheses from "src/app/text-syntheses/state/text-syntheses.selectors";

export const selectIsAnyActionInProgress = createSelector(
  languages.selectIsActionInProgress,
  textSyntheses.selectIsActionInProgress,
  (languageActionInProgress, textSynthesisActionInProgress) => languageActionInProgress || textSynthesisActionInProgress
)