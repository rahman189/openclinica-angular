import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectMatrixComponent } from './subject-matrix.component';

describe('SubjectMatrixComponent', () => {
  let component: SubjectMatrixComponent;
  let fixture: ComponentFixture<SubjectMatrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectMatrixComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
