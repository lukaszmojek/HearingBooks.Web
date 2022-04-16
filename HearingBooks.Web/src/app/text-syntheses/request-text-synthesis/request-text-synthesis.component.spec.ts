import { ComponentFixture, TestBed } from '@angular/core/testing'

import { RequestTextSynthesisComponent } from './request-text-synthesis.component'

describe('RequestTextSynthesisComponent', () => {
  let component: RequestTextSynthesisComponent
  let fixture: ComponentFixture<RequestTextSynthesisComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequestTextSynthesisComponent],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestTextSynthesisComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
