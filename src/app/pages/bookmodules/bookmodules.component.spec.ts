import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmodulesComponent } from './bookmodules.component';

describe('BookmodulesComponent', () => {
  let component: BookmodulesComponent;
  let fixture: ComponentFixture<BookmodulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookmodulesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmodulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
