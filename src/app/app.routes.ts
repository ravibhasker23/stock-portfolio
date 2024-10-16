import { Routes } from '@angular/router';

// Define the routes for the application
export const routes: Routes = [
  { path: '', redirectTo: '/stock', pathMatch: 'full' }, // Redirect root path to /stock
  {
    path: 'stock',
    loadChildren: () =>
      import('./stock/stock.module').then((m) => m.StockModule), // Lazy load the StockModule
  },
];
