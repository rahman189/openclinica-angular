import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyEventDefinitionComponent } from './study-event-definition.component';

describe('StudyEventDefinitionComponent', () => {
  let component: StudyEventDefinitionComponent;
  let fixture: ComponentFixture<StudyEventDefinitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudyEventDefinitionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudyEventDefinitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
