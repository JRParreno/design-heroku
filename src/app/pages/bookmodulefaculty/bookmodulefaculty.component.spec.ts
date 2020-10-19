import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmodulefacultyComponent } from './bookmodulefaculty.component';

describe('BookmodulefacultyComponent', () => {
  let component: BookmodulefacultyComponent;
  let fixture: ComponentFixture<BookmodulefacultyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookmodulefacultyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmodulefacultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
