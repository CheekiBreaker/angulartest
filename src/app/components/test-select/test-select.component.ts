import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { FormField } from '../../models/form-field.model';

@Component({
  selector: 'app-test-select',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="form-field">
      <label [for]="field.name">{{ field.label }}
      <span class="required" *ngIf="field.required">*</span>
    </label>
      
      <select
        [id]="field.name"
        [(ngModel)]="value"
        (ngModelChange)="onChange($event)"
        [attr.required]="field.required || null"
        [attr.disabled]="field.disabled || null"
      >
        <option value=""></option>
        <option
          *ngFor="let choice of field.choices"
          [value]="choice"
          [class.active]="isActive(choice)"
        >
          {{ choice }}
        </option>
      </select>
      <small *ngIf="field.description">{{ field.description }}</small>
    </div>
  `,
  styleUrls: ['./test-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TestSelectComponent),
      multi: true,
    },
  ],
})
export class TestSelectComponent implements ControlValueAccessor {
  @Input() field!: FormField;
  value: string = '';
  disabled: boolean = false;

  onChange: any = () => {};
  onTouch: any = () => {};

  isActive(choice: string): boolean {
    return !choice.startsWith('_');
  }

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
