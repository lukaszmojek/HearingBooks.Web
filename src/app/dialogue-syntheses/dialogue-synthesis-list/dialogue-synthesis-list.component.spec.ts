import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogueSynthesisListComponent } from './dialogue-synthesis-list.component';

describe('DialogueSynthesisListComponent', () => {
  let component: DialogueSynthesisListComponent;
  let fixture: ComponentFixture<DialogueSynthesisListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogueSynthesisListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogueSynthesisListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
