import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FxaCategoryDetailComponent } from './fxa-category-detail.component';

describe('FxaCategoryDetailComponent', () => {
  let component: FxaCategoryDetailComponent;
  let fixture: ComponentFixture<FxaCategoryDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FxaCategoryDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FxaCategoryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
