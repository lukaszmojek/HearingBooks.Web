import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogueSynthesisComponent } from './dialogue-synthesis.component';

describe('DialogueSynthesisComponent', () => {
  let component: DialogueSynthesisComponent;
  let fixture: ComponentFixture<DialogueSynthesisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogueSynthesisComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogueSynthesisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
