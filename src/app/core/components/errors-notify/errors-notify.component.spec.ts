import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorsNotifyComponent } from './errors-notify.component';

describe('ErrorsNotifyComponent', () => {
  let component: ErrorsNotifyComponent;
  let fixture: ComponentFixture<ErrorsNotifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorsNotifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorsNotifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
