import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JsonFormsAngularService, JsonFormsModule } from '@jsonforms/angular';
import { JsonFormsAngularMaterialModule } from '@jsonforms/angular-material';
import { Actions, setLocale, UISchemaElement } from '@jsonforms/core';
import AJV from 'ajv';
import JsonRefs from 'json-refs';
import { parsePhoneNumber } from 'libphonenumber-js';
import { forkJoin } from 'rxjs';
import { AppComponent } from './app.component';
import { CustomAutocompleteControlRenderer } from './custom.autocomplete';
import data from './data';
import { DataDisplayComponent } from './data.control';
import { LangComponent } from './lang.control';
import { initialState } from './store';

export const loadCore = (jsonformsService: JsonFormsAngularService, http: HttpClient): () => Promise<void> => {
  return () => {
    const ajv = new AJV({
      schemaId: 'auto',
      allErrors: true,
      jsonPointers: true,
      errorDataPath: 'property'
    });
    ajv.addFormat('time', '^([0-1][0-9]|2[0-3]):[0-5][0-9]$');
    ajv.addFormat('tel', maybePhoneNumber => {
      try {
        parsePhoneNumber(maybePhoneNumber, 'DE');
        return true;
      } catch (_) {
        return false;
      }
    });

    return forkJoin({
      uischema: http.get('./assets/uischema.json'),
      schema: http.get('./assets/schema.json')
    }).toPromise().then(result => {
      const { schema, uischema } = result;
      return JsonRefs.resolveRefs(schema)
        .then(
          (res: any) => {
            jsonformsService.updateCore(
              Actions.init(
                data,
                res.resolved,
                uischema as UISchemaElement,
                ajv as any
              )
            );
          }

        );
    });
  };
};
@NgModule({
  declarations: [
    AppComponent,
    CustomAutocompleteControlRenderer,
    LangComponent,
    DataDisplayComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    JsonFormsModule,
    JsonFormsAngularMaterialModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    HttpClientModule
  ],
  schemas: [],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: loadCore,
      deps: [JsonFormsAngularService, HttpClient],
      multi: true
    }
  ],
  entryComponents: [CustomAutocompleteControlRenderer, LangComponent, DataDisplayComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(jsonformsService: JsonFormsAngularService) {
    jsonformsService.init(initialState.jsonforms);

    jsonformsService.updateLocale(setLocale('de-DE'));


  }
}
