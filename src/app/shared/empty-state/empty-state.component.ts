import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'hb-empty-state',
  templateUrl: './empty-state.component.html',
  styleUrls: ['./empty-state.component.scss']
})
export class EmptyStateComponent {
  @Input() messageTranslationKey: string
  @Input() redirectButtonTranslationKey: string
  @Input() redirectButtonRoute: string

  constructor() { }
}
