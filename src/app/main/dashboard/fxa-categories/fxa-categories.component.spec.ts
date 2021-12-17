import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FxaCategoriesComponent } from './fxa-categories.component';

describe('FxaCategoriesComponent', () => {
  let component: FxaCategoriesComponent;
  let fixture: ComponentFixture<FxaCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FxaCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FxaCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
