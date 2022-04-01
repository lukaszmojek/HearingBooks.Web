import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextSynthesisComponent } from './text-synthesis.component';

describe('TextSynthesisRequestComponent', () => {
  let component: TextSynthesisComponent;
  let fixture: ComponentFixture<TextSynthesisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextSynthesisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextSynthesisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
