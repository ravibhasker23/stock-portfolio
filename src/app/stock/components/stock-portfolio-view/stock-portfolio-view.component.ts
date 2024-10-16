import { Component, Input, OnChanges } from '@angular/core';
import { IStock } from '../../store/stock-state.model';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-stock-portfolio-view',
  templateUrl: './stock-portfolio-view.component.html',
  styleUrl: './stock-portfolio-view.component.scss',
})
export class StockPortfolioViewComponent implements OnChanges {
  @Input()
  stocks!: IStock[];

  Highcharts: typeof Highcharts = Highcharts;

  chartOptions: Highcharts.Options = {};

  currentChartOptions: Highcharts.Options = {};

  constructor() {}

  // Stocks value updated in case of a new addition or removal. This updates chart based on the new values of stocks.
  ngOnChanges(): void {
    this.updateChart();
  }

  updateChart() {
    //preparing the data
    const boughtData = this.stocks.map((el) => ({
      name: el.name,
      y: Number(el.buyValue.toFixed(2)),
    }));

    const currentData = this.stocks.map((el) => ({
      name: el.name,
      y: Number(el.currentValue.toFixed(2)),
    }));

    let data = boughtData;

    //preparing the chart options
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
      accessibility: {
        enabled: false
      }
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
      accessibility: {
        enabled: false
      }
    };
  }
}
