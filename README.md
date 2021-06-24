# JSON Forms Angular Seed

JSONForms Angular Seed.

## Installation

Run `npm ci` to install the necessary dependencies.

## Development server

Run `npm start` for a dev server. Navigate to [http://localhost:4200/](http://localhost:4200/). The app will automatically reload if you change any of the source files.

## Build

Run `npm build` to build the project. The build artifacts will be stored in the `dist` directory. Use the `--configuration production` flag for a production build.

## Running unit tests

Run `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `npm e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Customizations

For this showcase we hardcoded the schemas (`schema.json`, `uischema.json`) and the data (`data.ts`). You can replace them with your own or handle them completely dynamically.

We implemented three custom controls (`custom.autocomplete.ts`, `lang.control.ts` and `data.control.ts`). If you don't need them just remove them! See also `store.ts` where these custom renderers are registered.

In `app.component.ts` we customized the validation. This step is optional and can be skipped if needed.
