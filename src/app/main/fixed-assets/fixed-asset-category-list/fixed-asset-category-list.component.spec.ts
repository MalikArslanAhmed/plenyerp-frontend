import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedAssetCategoryListComponent } from './fixed-asset-category-list.component';

describe('FxaCategoriesComponent', () => {
  let component: FixedAssetCategoryListComponent;
  let fixture: ComponentFixture<FixedAssetCategoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixedAssetCategoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedAssetCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
