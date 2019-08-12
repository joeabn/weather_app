import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OutputCardsComponent} from './output-cards.component';

describe('OutputCardsComponent', () => {
  let component: OutputCardsComponent;
  let fixture: ComponentFixture<OutputCardsComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OutputCardsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
