import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableSubjectSiteComponent } from './table-subject-site.component';

describe('TableSubjectSiteComponent', () => {
  let component: TableSubjectSiteComponent;
  let fixture: ComponentFixture<TableSubjectSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableSubjectSiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableSubjectSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
