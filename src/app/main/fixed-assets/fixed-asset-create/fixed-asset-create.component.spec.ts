import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedAssetCreateComponent } from './fixed-asset-create.component';

describe('CreateFixedAssetsComponent', () => {
  let component: FixedAssetCreateComponent;
  let fixture: ComponentFixture<FixedAssetCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixedAssetCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedAssetCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
