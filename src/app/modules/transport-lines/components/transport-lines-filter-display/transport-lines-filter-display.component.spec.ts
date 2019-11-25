import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportLinesFilterDisplayComponent } from './transport-lines-filter-display.component';

describe('AutoCompleteFilterComponent', () => {
  let component: TransportLinesFilterDisplayComponent;
  let fixture: ComponentFixture<TransportLinesFilterDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportLinesFilterDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportLinesFilterDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
