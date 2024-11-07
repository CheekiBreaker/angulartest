import { Component, Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { FormField } from '../../models/form-field.model';

@Component({
  selector: 'app-test-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="form-field">
      <label [for]="field.name">
        {{ field.label }}
        <span class="required" *ngIf="field.required">*</span>
      </label>
      <div class="input-group" *ngIf="field.name === 'university'; else regularInput">
        <input
          [id]="field.name"
          type="text"
          [(ngModel)]="value"
          (ngModelChange)="onChange($event)"
          [attr.required]="field.required || null"
          [attr.disabled]="field.disabled || null"
        />
        <button type="button" (click)="onAddUniversity()">Добавить ВУЗ</button>
      </div>
      <ng-template #regularInput>
        <input
          [id]="field.name"
          type="text"
          [(ngModel)]="value"
          (ngModelChange)="onChange($event)"
          [attr.required]="field.required || null"
          [attr.disabled]="field.disabled || null"
        />
      </ng-template>
      <small *ngIf="field.description">{{ field.description }}</small>
    </div>
  `,
  styleUrls: ['./test-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TestInputComponent),
      multi: true,
    },
  ],
})
export class TestInputComponent implements ControlValueAccessor {
  @Input() field!: FormField;
  value: string = '';
  disabled: boolean = false;

  onChange: any = () => {};
  onTouch: any = () => {};

  onAddUniversity() {
    const event = new CustomEvent('addUniversity');
    window.dispatchEvent(event);
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
