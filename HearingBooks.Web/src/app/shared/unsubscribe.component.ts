import { Component, OnDestroy } from '@angular/core'
import { Subject } from 'rxjs'

@Component({
  template: '',
})
export default class UnsubscribeComponent implements OnDestroy {
  protected unsubscribe$: Subject<void> = new Subject()

  ngOnDestroy() {
    this.unsubscribe$.next()
    this.unsubscribe$.complete()
  }
}
