import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedAssetsDepreciationComponent } from './fixed-assets-depreciation.component';

describe('FixedAssetsDepriciationComponent', () => {
  let component: FixedAssetsDepreciationComponent;
  let fixture: ComponentFixture<FixedAssetsDepreciationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixedAssetsDepreciationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedAssetsDepreciationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
