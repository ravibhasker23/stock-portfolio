import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockPortfolioViewComponent } from './stock-portfolio-view.component';

describe('StockPortfolioViewComponent', () => {
  let component: StockPortfolioViewComponent;
  let fixture: ComponentFixture<StockPortfolioViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockPortfolioViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(StockPortfolioViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
