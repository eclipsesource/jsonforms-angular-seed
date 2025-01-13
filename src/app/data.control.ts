import { Component } from '@angular/core';
import { JsonFormsAngularService, JsonFormsControl } from '@jsonforms/angular';
import { ControlProps } from '@jsonforms/core';

@Component({
  selector: 'app-data-component',
  template: '<pre>{{dataAsString}}</pre>',
  standalone: false
})
export class DataDisplayComponent extends JsonFormsControl {

  dataAsString: string | undefined;

  constructor(service: JsonFormsAngularService) {
    super(service);
  }

  public override mapAdditionalProps(props: ControlProps) {
    this.dataAsString = JSON.stringify(props.data, null, 2);
  }
}
