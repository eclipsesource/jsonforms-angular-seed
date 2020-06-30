import {combineReducers, Reducer} from 'redux';
import {and, jsonformsReducer, JsonFormsState, rankWith, schemaTypeIs, scopeEndsWith, Tester, isControl, optionIs, } from '@jsonforms/core';

import {angularMaterialRenderers} from '@jsonforms/angular-material';
import {CustomAutocompleteControlRenderer} from './custom.autocomplete';
import {LangComponent} from './lang.control';
import { DataDisplayComponent } from './data.control';

export const rootReducer: Reducer<JsonFormsState> = combineReducers({ jsonforms: jsonformsReducer() });

const departmentTester: Tester = and(
  schemaTypeIs('string'),
  scopeEndsWith('department')
);

export const initialState: any = {
  jsonforms: {
    renderers: [
      ...angularMaterialRenderers,
      { tester: rankWith(5, departmentTester), renderer: CustomAutocompleteControlRenderer },
      {
        renderer: DataDisplayComponent,
        tester: rankWith(
          6,
          and(
            isControl,
            scopeEndsWith('___data')
          )
        )
      },
      {
        renderer: LangComponent,
        tester: rankWith(
          6,
          and(
            isControl,
            optionIs('lang', true)
          )
        )
      },
    ],
    cells: [],
  }
};
