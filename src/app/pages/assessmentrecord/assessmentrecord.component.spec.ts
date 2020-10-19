import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentrecordComponent } from './assessmentrecord.component';

describe('AssessmentrecordComponent', () => {
  let component: AssessmentrecordComponent;
  let fixture: ComponentFixture<AssessmentrecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessmentrecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentrecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
