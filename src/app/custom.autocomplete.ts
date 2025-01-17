import {generate} from "random-words";
import {debounceTime, finalize, tap} from 'rxjs/operators';
import {switchMap} from 'rxjs/operators';
import {delay} from 'rxjs/operators';
import {of} from 'rxjs';
import {AutocompleteControlRenderer} from '@jsonforms/angular-material';
import {Observable} from 'rxjs';
import {Component} from '@angular/core';

const words: string[] = generate(1000) as string[];

const fetchSuggestions = (input: string): Observable<string[]> => {
  const filtered: string[] = words.filter(word => word.startsWith(input));
  return of(filtered).pipe(delay(1000));
};

@Component({
  selector: 'jsonforms-custom-autocomplete',
  template: `
        <mat-form-field fxFlex>
            <mat-label>{{ label }}</mat-label>
            <input
                matInput
                type="text"
                (input)="onChange($event)"
                placeholder="{{ description }}"
                [id]="id"
                [formControl]="form"
                [matAutocomplete]="auto"
            >
            <mat-autocomplete
                autoActiveFirstOption #auto="matAutocomplete" (optionSelected)="onSelect($event)">
              <mat-option *ngIf="isLoading" class="is-loading"><mat-spinner diameter="30"></mat-spinner></mat-option>
              <ng-container *ngIf="!isLoading">
                <mat-option *ngFor="let option of filteredOptions | async" [value]="option">
                    {{ option }}
                </mat-option>
              </ng-container>
            </mat-autocomplete>
            <mat-error>{{ error }}</mat-error>
        </mat-form-field>
    `,
  standalone: false
})
export class CustomAutocompleteControlRenderer extends AutocompleteControlRenderer {

  isLoading: boolean = false;

  override ngOnInit() {
    super.ngOnInit();
    this.form.valueChanges
      .pipe(
        debounceTime(300),
        tap(() => this.isLoading = true),
        switchMap(value => fetchSuggestions(value)
          .pipe(
            finalize(() => this.isLoading = false)
          )
        )
      )
      .subscribe((options: string[]) => this.options = options);
  }
}
