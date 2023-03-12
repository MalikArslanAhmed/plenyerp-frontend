import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedAssetsReportComponent } from './fixed-assets-report.component';

describe('FixedAssetsReportComponent', () => {
  let component: FixedAssetsReportComponent;
  let fixture: ComponentFixture<FixedAssetsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixedAssetsReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedAssetsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
