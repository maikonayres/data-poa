import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportLinesComponent } from './transport-lines.component';

describe('ItineraryComponent', () => {
  let component: TransportLinesComponent;
  let fixture: ComponentFixture<TransportLinesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportLinesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportLinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
