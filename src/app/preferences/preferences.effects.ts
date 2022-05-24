// import { Injectable } from "@angular/core";
// import { Actions, createEffect, ofType } from "@ngrx/effects";
// import { TranslateService } from "@ngx-translate/core";
// import { exhaustMap, map, tap, catchError, of } from "rxjs";
// import { AuthActions } from "../auth/auth.actions";
// import { PreferencesActions } from "./preferences.actions";

// @Injectable()
// export class PreferencesEffects {
//   languageChanged$ = createEffect(() => this.actions$.pipe(
//     ofType(PreferencesActions.languageChanged),
//     exhaustMap(action => this.translate.use(action.language))
//       .pipe(
//         map(response => AuthActions.logInSuccess({token: response.content.token})),
//         tap(_ => {this.router.navigateByUrl('dashboard')}),
//         catchError(_ => of(AuthActions.logInFailed()))
//       ))
//     )
//   );

//   constructor(
//     private actions$: Actions,
//     private translate: TranslateService
//   ) {}
// }
