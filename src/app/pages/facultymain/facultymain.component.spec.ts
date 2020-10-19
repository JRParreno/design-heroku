import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultymainComponent } from './facultymain.component';

describe('FacultymainComponent', () => {
  let component: FacultymainComponent;
  let fixture: ComponentFixture<FacultymainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacultymainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacultymainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
