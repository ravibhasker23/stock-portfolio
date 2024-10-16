import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StockPortfolioViewComponent } from './stock-portfolio-view.component';
import { TotalPipe } from '../../pipes/total.pipe';
import { IStock } from '../../store/stock-state.model';
import * as Highcharts from 'highcharts';

describe('StockPortfolioViewComponent', () => {
  let component: StockPortfolioViewComponent;
  let fixture: ComponentFixture<StockPortfolioViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StockPortfolioViewComponent],
      providers: [TotalPipe],
    }).compileComponents();

    fixture = TestBed.createComponent(StockPortfolioViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update chart options on input change', () => {
    const stocks: IStock[] = [
      { name: 'AAPL', buyValue: 150, currentValue: 160 },
      { name: 'GOOGL', buyValue: 2800, currentValue: 2900 },
    ];

    component.stocks = stocks;
    component.ngOnChanges();

    expect(component.chartOptions.series.data).toEqual([
      { name: 'AAPL', y: 150 },
      { name: 'GOOGL', y: 2800 },
    ]);

    expect(component.currentChartOptions.series.data).toEqual([
      { name: 'AAPL', y: 160 },
      { name: 'GOOGL', y: 2900 },
    ]);
  });

  it('should set chart options correctly in updateChart method', () => {
    const stocks: IStock[] = [
      { name: 'AAPL', buyValue: 150, currentValue: 160 },
      { name: 'GOOGL', buyValue: 2800, currentValue: 2900 },
    ];

    component.stocks = stocks;
    component.updateChart();

    expect(component.chartOptions).toEqual({
      chart: { type: 'pie' },
      title: { text: 'Bought values' },
      series: [
        {
          name: 'Bought',
          data: [
            { name: 'AAPL', y: 150 },
            { name: 'GOOGL', y: 2800 },
          ],
          type: 'pie',
        },
      ],
    });

    expect(component.currentChartOptions).toEqual({
      chart: { type: 'pie' },
      title: { text: 'Current values' },
      series: [
        {
          name: 'Current',
          data: [
            { name: 'AAPL', y: 160 },
            { name: 'GOOGL', y: 2900 },
          ],
          type: 'pie',
        },
      ],
    });
  });
});
