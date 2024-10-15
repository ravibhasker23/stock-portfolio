import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { StockComponent } from './stock.component';
import { StockListComponent } from './components/stock-list/stock-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TotalPipe } from './pipes/total.pipe';
import { StockPortfolioViewComponent } from './components/stock-portfolio-view/stock-portfolio-view.component';
import { HighchartsChartModule } from 'highcharts-angular';

const routes: Routes = [
  { path: '', component: StockComponent }
];

@NgModule({
  declarations: [
    StockComponent,
    StockListComponent,
    TotalPipe,
    StockPortfolioViewComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    HighchartsChartModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class StockModule { }
