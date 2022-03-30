import { Component } from "@angular/core"
import { select, Store } from "@ngrx/store"
import { takeUntil } from 'rxjs/operators';
import UnsubscribeComponent from "./unsubscribe.component"

@Component({
  template: ''
})
export default class StoreConnectedComponent<T> extends UnsubscribeComponent {
  constructor(protected store$: Store<T>) {
    super()
  }

  //TODO: Try to change that and put a type restrictions
  safeSelect$(selector: any) {
    return this.store$.pipe(
      select(selector), 
      takeUntil(this.unsubscribe$)
    )
  }
}