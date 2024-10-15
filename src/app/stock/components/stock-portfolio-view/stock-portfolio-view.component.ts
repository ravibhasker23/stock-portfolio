import { Component, Input, OnChanges } from '@angular/core';
import { IStock } from '../../store/stock-state.model';
import * as Highcharts from 'highcharts';
import { TotalPipe } from '../../pipes/total.pipe';

@Component({
  selector: 'app-stock-portfolio-view',
  templateUrl: './stock-portfolio-view.component.html',
  styleUrl: './stock-portfolio-view.component.scss',
  providers: [TotalPipe]
})
export class StockPortfolioViewComponent implements OnChanges {

  @Input()
  stocks!: IStock[];
  
  Highcharts: typeof Highcharts = Highcharts;

  chartOptions: Highcharts.Options = {};

  currentChartOptions: Highcharts.Options = {};

  constructor(private totalPipe: TotalPipe){}

  ngOnChanges(): void {
    this.updateChart();
  }

  updateChart(){
    const totalBuyValue = this.totalPipe.transform(this.stocks, 'buyValue');
    const totalCurrentValue = this.totalPipe.transform(this.stocks, 'currentValue');

    let data: { name: string; y: number; }[] = [];
    let data2: { name: string; y: number; }[] = [];
    this.stocks.forEach(element => {
      data.push({
        name: element.name, y: Number(element.buyValue.toFixed(2))
      });
      data2.push({
        name: element.name, y: Number(element.currentValue.toFixed(2))
      });
    });

    this.chartOptions = {
      chart: {
        type: 'pie'
      },
      title:{
        text: 'Portfolio element values',
      },
      series: [{
        name: 'Bought',
        data,
        type: 'pie',
      }]
    }

    data = [];
    data = data2;
    this.currentChartOptions = {
      chart: {
        type: 'pie'
      },
      title:{
        text: 'Portfolio element values',
      },
      series: [{
        name: 'Current',
        data,
        type: 'pie',
      }]
    }
  }
}
