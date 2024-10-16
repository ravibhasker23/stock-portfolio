# StockPortfolio

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.6.
Stock portfolio dashboard is a web solution offerring user to add a new stock, view the portfolio element values in a graphical way and tabular view to display all the data related to a particular stock. Below are a few details on the dashboard and how to navigate through.

- `Symbol` is a dropdown with pre-loaded values of stock symbols(check `constants/stock.data.ts` file). It is maintained in a constant file which is loaded initially. `Contracts` and `Buy price` is a text input for entering the number of contracts and buy value
- `Add stock` calls the `price-data` service based on the `vwdKey` value. Checks if it is for a US or NL stock for normalizing to EUR and checks if stock already exists in the portfolio. If exists it updates the portfolio table and if not it adds a new value to the table. It also creates a graphical view of bought value/price and current price/value w.r.t name of the stock.
- `Remove stock` removes the existing stock from the portfolio.

Bonus points covered in the project:

- Ensure a persistance mechanism (used `ngrx` for state management)
- Maintain a single position when the same symbol is added multiple times (handled in `reducer` to check for existing stock symbol)
- Support multiple currencies and normalize to EUR (check for `US/NL` stocks and fetch the exchange rate price and update the current price by normalizing to `EUR`)
- Ensure solution covers a test coverage of ~ 80% (unit test coverage `ng test --code-coverage` is more than 80%)
- Show a pie chart of the portfolio element values(e.g. using Highcharts) ( created two view for bought and current values)

## Packages

Below are the details on the packages used.

- `bootstrap` for styling/layout, other components.
- `NgRx` for state management, managing global state across an entire application.
- `highcharts` and `highcharts-angular` for creating the chart component.
- `jasmine` and `karma` for unit testing.
- `prettier` used for prettifying the code base.

## Development server

Run `npm install` to install all the dependencies.
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` or `ng test --code-coverage` to execute the unit tests via [Karma]
