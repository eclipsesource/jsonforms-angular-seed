import { Component } from '@angular/core';
import { JsonFormsAngularService, JsonFormsControl } from '@jsonforms/angular';
import { getLocale, setLocale } from '@jsonforms/core';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-lang-component',
  template: `
    <p>Click button to set locale</p>
    <p>Current locale: {{currentLocale}}</p>
    <button mat-raised-button color="primary" (click)="changeLocale('de-DE')">de-DE</button>
    <button mat-raised-button color="primary" (click)="changeLocale('en-US')">en-US</button>
  `
})
export class LangComponent extends JsonFormsControl {

  currentLocale: string;
  dateAdapter;

  constructor(service: JsonFormsAngularService, dateAdapter: DateAdapter<Date>) {
    super(service);
    this.dateAdapter = dateAdapter;
  }

  mapAdditionalProps() {
    this.currentLocale = getLocale(this.jsonFormsService.getState());
  }

  changeLocale(localeString: string) {
    this.jsonFormsService.updateI18n(setLocale(localeString));
    this.dateAdapter.setLocale(localeString);
  }
}
