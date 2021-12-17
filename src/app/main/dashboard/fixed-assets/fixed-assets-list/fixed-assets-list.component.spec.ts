import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixedAssetsListComponent } from './fixed-assets-list.component';

describe('FixedAssetsListComponent', () => {
  let component: FixedAssetsListComponent;
  let fixture: ComponentFixture<FixedAssetsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixedAssetsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixedAssetsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
