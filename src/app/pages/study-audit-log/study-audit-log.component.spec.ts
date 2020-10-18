import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyAuditLogComponent } from './study-audit-log.component';

describe('StudyAuditLogComponent', () => {
  let component: StudyAuditLogComponent;
  let fixture: ComponentFixture<StudyAuditLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudyAuditLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyAuditLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
