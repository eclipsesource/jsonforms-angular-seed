import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { JsonFormsControl } from '@jsonforms/angular';
import { ControlProps } from '@jsonforms/core';

@Component({
  selector: 'app-data-component',
  template: '<pre>{{dataAsString}}</pre>',
  standalone: false
})
export class DataDisplayComponent extends JsonFormsControl {

  private cdr = inject(ChangeDetectorRef);
  dataAsString: string | undefined;

  public override mapAdditionalProps(props: ControlProps) {
    this.dataAsString = JSON.stringify(props.data, null, 2);
    this.cdr.markForCheck();
  }
}
