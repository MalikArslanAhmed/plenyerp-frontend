import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedAssetReDeploymentComponent } from './fixed-asset-re-deployment.component';

describe('FixedAssetReDeploymentComponent', () => {
  let component: FixedAssetReDeploymentComponent;
  let fixture: ComponentFixture<FixedAssetReDeploymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixedAssetReDeploymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedAssetReDeploymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
