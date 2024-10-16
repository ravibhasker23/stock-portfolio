import { Component, Input, OnChanges } from '@angular/core';
import { IStock } from '../../store/stock-state.model';
import * as Highcharts from 'highcharts';
import { TotalPipe } from '../../pipes/total.pipe';

@Component({
  selector: 'app-stock-portfolio-view',
  templateUrl: './stock-portfolio-view.component.html',
  styleUrl: './stock-portfolio-view.component.scss',
  providers: [TotalPipe],
})
export class StockPortfolioViewComponent implements OnChanges {
  @Input()
  stocks!: IStock[];

  Highcharts: typeof Highcharts = Highcharts;

  chartOptions: Highcharts.Options = {};

  currentChartOptions: Highcharts.Options = {};

  constructor(private totalPipe: TotalPipe) {}

  ngOnChanges(): void {
    this.updateChart();
  }

  updateChart() {
    const boughtData = this.stocks.map((el) => ({
      name: el.name,
      y: Number(el.buyValue.toFixed(2)),
    }));

    const currentData = this.stocks.map((el) => ({
      name: el.name,
      y: Number(el.currentValue.toFixed(2)),
    }));

    let data = boughtData;

    this.chartOptions = {
      chart: {
        type: 'pie',
      },
      title: {
        text: 'Bought values',
      },
      series: [
        {
          name: 'Bought',
          data,
          type: 'pie',
        },
      ],
    };

    data = currentData;

    this.currentChartOptions = {
      chart: {
        type: 'pie',
      },
      title: {
        text: 'Current values',
      },
      series: [
        {
          name: 'Current',
          data,
          type: 'pie',
        },
      ],
    };
  }
}
