import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectDialogComponent } from './subject-dialog.component';

describe('AddDialogComponent', () => {
  let component: SubjectDialogComponent;
  let fixture: ComponentFixture<SubjectDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubjectDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
