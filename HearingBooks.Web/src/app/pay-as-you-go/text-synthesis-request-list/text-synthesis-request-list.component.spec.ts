import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextSynthesisRequestListComponent } from './text-synthesis-request-list.component';

describe('RequestListComponent', () => {
  let component: TextSynthesisRequestListComponent;
  let fixture: ComponentFixture<TextSynthesisRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextSynthesisRequestListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextSynthesisRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
