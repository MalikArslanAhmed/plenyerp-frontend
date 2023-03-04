import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCategoriesModalComponent } from './select-categories-modal.component';

describe('SelectCategoriesModalComponent', () => {
  let component: SelectCategoriesModalComponent;
  let fixture: ComponentFixture<SelectCategoriesModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectCategoriesModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCategoriesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
