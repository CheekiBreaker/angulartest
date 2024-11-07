import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FormField } from '../../models/form-field.model';

@Component({
  selector: 'app-test-number',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="form-field">
      <label [for]="field.name">{{ field.label }}</label>
      <input
        [id]="field.name"
        type="number"
        [(ngModel)]="value"
        (ngModelChange)="onChange($event)"
        [attr.required]="field.required || null"
        [attr.disabled]="field.disabled || null"
      />
      <small *ngIf="field.description">{{ field.description }}</small>
    </div>
  `,
  styleUrls: ['./test-number.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TestNumberComponent),
      multi: true,
    },
  ],
})
export class TestNumberComponent implements ControlValueAccessor {
  @Input() field!: FormField;
  value: number = 0;
  disabled: boolean = false;

  onChange: any = () => {};
  onTouch: any = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}