import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TopUpService } from './top-up.service';

@Component({
  selector: 'hb-top-up-dialog',
  templateUrl: './top-up-dialog.component.html',
  styleUrls: ['./top-up-dialog.component.scss']
})
export class TopUpDialogComponent {
  public amountFormControl = new FormControl('')

  @Output() shouldClose = new EventEmitter<boolean>()

  constructor(private topUpService: TopUpService) { }

  public topUp(): void {
    const amount = this.amountFormControl.value
    this.topUpService.topUp$(amount).subscribe(response => {
      this.shouldClose.emit(true)
    })
  }
}
