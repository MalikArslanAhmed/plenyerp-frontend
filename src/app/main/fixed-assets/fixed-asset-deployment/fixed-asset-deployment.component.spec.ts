import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedAssetDeploymentComponent } from './fixed-asset-deployment.component';

describe('FixedAssetDeploymentComponent', () => {
  let component: FixedAssetDeploymentComponent;
  let fixture: ComponentFixture<FixedAssetDeploymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixedAssetDeploymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedAssetDeploymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
