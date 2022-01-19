import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFixedAssetsComponent } from './create-fixed-assets.component';

describe('CreateFixedAssetsComponent', () => {
  let component: CreateFixedAssetsComponent;
  let fixture: ComponentFixture<CreateFixedAssetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFixedAssetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFixedAssetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
