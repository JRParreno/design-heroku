import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilecheckingComponent } from './filechecking.component';

describe('FilecheckingComponent', () => {
  let component: FilecheckingComponent;
  let fixture: ComponentFixture<FilecheckingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilecheckingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilecheckingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
