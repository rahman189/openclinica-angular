import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSubjectStudyComponent } from './table-subject-study.component';

describe('TableSubjectStudyComponent', () => {
  let component: TableSubjectStudyComponent;
  let fixture: ComponentFixture<TableSubjectStudyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableSubjectStudyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableSubjectStudyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
