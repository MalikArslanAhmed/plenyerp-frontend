import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeLoginAccessComponent } from './employee-login-access.component';

describe('EmployeeLoginAccessComponent', () => {
  let component: EmployeeLoginAccessComponent;
  let fixture: ComponentFixture<EmployeeLoginAccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeLoginAccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeLoginAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
