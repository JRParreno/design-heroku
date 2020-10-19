import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChapterfacultyComponent } from './chapterfaculty.component';

describe('ChapterfacultyComponent', () => {
  let component: ChapterfacultyComponent;
  let fixture: ComponentFixture<ChapterfacultyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChapterfacultyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChapterfacultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
