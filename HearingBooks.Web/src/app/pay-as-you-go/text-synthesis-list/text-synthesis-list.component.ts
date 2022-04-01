import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import AcrylicAwareComponent from 'src/app/shared/acrylic/acrylic-aware.component'
import { IMainComponent } from 'src/app/shared/main-component.interface'
import { IApplicationState } from 'src/app/shared/state'
import { ITextSynthesisRequest } from '../text-synthesis/models'

@Component({
  selector: 'hb-text-synthesis-list',
  templateUrl: './text-synthesis-list.component.html',
  styleUrls: ['./text-synthesis-list.component.scss'],
})
export class TextSynthesisListComponent
  extends AcrylicAwareComponent
  implements IMainComponent
{
  titleTranslationKey = 'PayAsYouGo.TextSyntheses.Title'
  divider = true
  elevation = true
  border = false

  requests: ITextSynthesisRequest[] = [
    {
      title: 'First synthesis',
      content: 'Content that is maybe a bit short but at leasit it is xD',
      characterCount: 123,
      price: '0.7 EUR',
      requestedOn: new Date(),
      synthesisLength: '0:30',
      synthesisFileUrl: 'some_random_url_will_go_here',
    },
    {
      title: 'Second synthesis',
      content:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione itaque accusantium delectus culpa eligendi, similique, eveniet nostrum alias ducimus ab velit explicabo quae reiciendis quis? Inventore voluptatum dignissimos magnam sit.',
      characterCount: 20004,
      price: '15.3 EUR',
      requestedOn: new Date(),
      synthesisLength: '23:44',
      synthesisFileUrl: 'some_random_url_will_go_here',
    },
  ]

  constructor(store$: Store<IApplicationState>) {
    super(store$)
  }
}
