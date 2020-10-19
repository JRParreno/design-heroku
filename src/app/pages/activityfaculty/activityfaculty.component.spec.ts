import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityfacultyComponent } from './activityfaculty.component';

describe('ActivityfacultyComponent', () => {
  let component: ActivityfacultyComponent;
  let fixture: ComponentFixture<ActivityfacultyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivityfacultyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityfacultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
