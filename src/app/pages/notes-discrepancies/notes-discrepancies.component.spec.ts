import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesDiscrepanciesComponent } from './notes-discrepancies.component';

describe('NotesDiscrepanciesComponent', () => {
  let component: NotesDiscrepanciesComponent;
  let fixture: ComponentFixture<NotesDiscrepanciesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotesDiscrepanciesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesDiscrepanciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
