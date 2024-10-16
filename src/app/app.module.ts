import { CUSTOM_ELEMENTS_SCHEMA, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RouterModule, Routes } from '@angular/router';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StockEffects, StockReducer } from './stock/store';
import { StockService } from './stock/services/stock.service';

// Define the routes for the application
const routes: Routes = [
  { path: '', redirectTo: '/stock', pathMatch: 'full' }, // Redirect root path to /stock
  {
    path: 'stock',
    loadChildren: () =>
      import('./stock/stock.module').then((m) => m.StockModule), // Lazy load the StockModule
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({ stock: StockReducer }), // Configure the root state with StockReducer
    EffectsModule.forRoot([StockEffects]),// Register the root effects with StockEffects
    FormsModule,
    RouterModule.forRoot(routes),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),  // Configure Store Devtools with a maximum age of 25 and log only in production mode
  ],
  providers: [provideAnimationsAsync(), StockService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
