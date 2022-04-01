import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextSynthesisListComponent } from './text-synthesis-list.component';

describe('RequestListComponent', () => {
  let component: TextSynthesisListComponent;
  let fixture: ComponentFixture<TextSynthesisListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextSynthesisListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextSynthesisListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
