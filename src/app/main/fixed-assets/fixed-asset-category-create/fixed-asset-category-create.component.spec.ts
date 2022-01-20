import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedAssetCategoryCreateComponent } from './fixed-asset-category-create.component';

describe('CreateCategoryComponent', () => {
  let component: FixedAssetCategoryCreateComponent;
  let fixture: ComponentFixture<FixedAssetCategoryCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixedAssetCategoryCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedAssetCategoryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
