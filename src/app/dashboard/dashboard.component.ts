import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUserId } from '../auth/auth.selectors';
import { selectIsActionInProgress } from '../languages/languages.selectors';
import AcrylicAwareComponent from '../shared/acrylic/acrylic-aware.component';
import { AcrylicService } from '../shared/acrylic/acrylic.service';
import { IMainComponent } from '../shared/main-component.interface';
import { IApplicationState } from '../shared/state';
import { DashboardActions } from './state/dashboard.actions';
import { selectSynthesesSummary } from './state/dashboard.selectors';
import { ISynthesesSummary } from './state/models';

@Component({
  selector: 'hb-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends AcrylicAwareComponent<IApplicationState>
  implements IMainComponent, OnInit {
  titleTranslationKey = 'Dashboard.Title'
  divider = true
  elevation = true
  border = false

  isActionInProgress$: Observable<boolean>
  synthesesSummary: ISynthesesSummary

  constructor(store$: Store<IApplicationState>, acrylic: AcrylicService) {
    super(store$, acrylic)
    this.isActionInProgress$ = this.safeSelect$(selectIsActionInProgress)
  }

  ngOnInit(): void {
    this.safeSelect$(selectUserId).subscribe(userId => {
      this.store$.dispatch(DashboardActions.loadSynthesesSummaryForUser({ userId: userId }))
    })

    this.safeSelect$(selectSynthesesSummary).subscribe(synthesesSummary => {
      this.synthesesSummary = synthesesSummary
    })
  }
}

