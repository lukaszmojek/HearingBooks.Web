import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextSynthesisRequestComponent } from './text-synthesis-request.component';

describe('TextSynthesisRequestComponent', () => {
  let component: TextSynthesisRequestComponent;
  let fixture: ComponentFixture<TextSynthesisRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextSynthesisRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextSynthesisRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
