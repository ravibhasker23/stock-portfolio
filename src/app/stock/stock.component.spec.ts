import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockComponent } from './stock.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('StockComponent', () => {
  let component: StockComponent;
  let fixture: ComponentFixture<StockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StockComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(StockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
