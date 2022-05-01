import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestDialogueSynthesisComponent } from './request-dialogue-synthesis.component';

describe('RequestDialogueSynthesisComponent', () => {
  let component: RequestDialogueSynthesisComponent;
  let fixture: ComponentFixture<RequestDialogueSynthesisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestDialogueSynthesisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestDialogueSynthesisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
