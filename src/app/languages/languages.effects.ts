import { Injectable } from '@angular/core'
import { LanguagesService } from './languages.service'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { LanguagesActions } from './languages.actions'
import { exhaustMap, catchError, map, take, mergeMap } from 'rxjs/operators'
import { iif, Observable, of } from 'rxjs'
import { ILanguagesState } from './languages.reducer'
import { select, State } from '@ngrx/store'
import { selectLanguages } from './languages.selectors'
import { ISynthesisLanguage } from './models'

@Injectable()
export class LanguagesEffects {
  loadLanguagesWithVoices$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LanguagesActions.loadLangaugesWithVoices),
      exhaustMap(action =>
        this.selectSourceOfDataForLanuages$().pipe(
          map(languages =>
            LanguagesActions.loadLangaugesWithVoicesSucceded({ languages: languages })
          ),
          catchError(_ => of(LanguagesActions.loadLangaugesWithVoicesFailed()))
        )
      )
    )
  )

  private selectSourceOfDataForLanuages$(): Observable<ISynthesisLanguage[]> {
    return this.store$.pipe(
      take(1), //TODO: Is this needed?
      select(selectLanguages),
      mergeMap((languages: ISynthesisLanguage[]) =>
        iif(
          () => languages.length !== 0,
          of(languages),
          this.languagesService.getLanguagesWithVoices$()
        )
      )
    )
  }

  constructor(
    private actions$: Actions,
    private languagesService: LanguagesService,
    private store$: State<ILanguagesState>
  ) { }
}
