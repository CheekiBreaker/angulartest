import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TestInputComponent } from '../test-input/test-input.component';
import { TestSelectComponent } from '../test-select/test-select.component';
import { TestNumberComponent } from '../test-number/test-number.component';
import { TestCheckboxComponent } from '../test-checkbox/test-checkbox.component';
import { FormService } from '../../services/form.service';
import { FormField, TestForm } from '../../models/form-field.model';

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TestInputComponent,
    TestSelectComponent,
    TestNumberComponent,
    TestCheckboxComponent,
  ],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="dynamic-form">
      <ng-container *ngFor="let field of fields">
        <app-test-input
          *ngIf="field.type === 'input'"
          [field]="field"
          [formControlName]="field.name"
        ></app-test-input>
        
        <app-test-select
          *ngIf="field.type === 'select'"
          [field]="field"
          [formControlName]="field.name"
        ></app-test-select>
        
        <app-test-number
          *ngIf="field.type === 'number'"
          [field]="field"
          [formControlName]="field.name"
        ></app-test-number>
        
        <app-test-checkbox
          *ngIf="field.type === 'checkbox'"
          [field]="field"
          [formControlName]="field.name"
        ></app-test-checkbox>
      </ng-container>

      <div *ngFor="let university of additionalUniversities; let i = index" class="form-field">
        <label>
          Дополнительный ВУЗ
          <span class="required">*</span>
        </label>
        <div class="input-group">
          <input
            type="text"
            [formControlName]="'university' + (i + 1)"
            required
          />
          <button type="button" (click)="removeUniversity(i)">Удалить</button>
        </div>
      </div>

      <button type="submit" [disabled]="!form.valid">Отправить</button>
    </form>
  `,
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit {
  fields: FormField[] = [];
  form: FormGroup;
  additionalUniversities: number[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private formService: FormService
  ) {
    this.form = this.formBuilder.group({});
    
    // Listen for addUniversity events
    window.addEventListener('addUniversity', () => {
      this.addUniversity();
    });
  }

  ngOnInit() {
    this.formService.getFormConfig().subscribe((fields) => {
      this.fields = fields;
      this.createForm();
      this.setupSelectAllCheckbox();
    });
  }

  createForm() {
    const group: any = {};

    this.fields.forEach((field) => {
      group[field.name] = ['', field.required ? Validators.required : []];
    });

    this.form = this.formBuilder.group(group);

    // Subscribe to selectAll changes
    this.form.get('selectAll')?.valueChanges.subscribe((checked) => {
      if (checked !== null) {
        this.updateAllCheckboxes(checked);
      }
    });
  }

  addUniversity() {
    const index = this.additionalUniversities.length + 1;
    this.additionalUniversities.push(index);
    this.form.addControl('university' + index, this.formBuilder.control('', Validators.required));
  }

  removeUniversity(index: number) {
    this.additionalUniversities.splice(index, 1);
    this.form.removeControl('university' + (index + 1));
    
    // Rename remaining controls
    for (let i = index + 1; i < this.additionalUniversities.length + 1; i++) {
      const oldName = 'university' + (i + 1);
      const newName = 'university' + i;
      const control = this.form.get(oldName);
      if (control) {
        this.form.addControl(newName, control);
        this.form.removeControl(oldName);
      }
    }
  }

  setupSelectAllCheckbox() {
    const selectAllControl = this.form.get('selectAll');
    if (selectAllControl) {
      selectAllControl.valueChanges.subscribe((checked) => {
        if (checked !== null) {
          this.updateAllCheckboxes(checked);
        }
      });
    }
  }

  updateAllCheckboxes(checked: boolean) {
    this.fields.forEach((field) => {
      if (field.type === 'checkbox' && field.name !== 'selectAll') {
        this.form.get(field.name)?.setValue(checked, { emitEvent: false });
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const testForm: TestForm = this.form.value;
      console.log('Form submitted:', testForm);
    }
  }

  loadFormData(data: TestForm) {
    this.form.patchValue(data);
  }

  ngOnDestroy() {
    window.removeEventListener('addUniversity', () => {});
  }
}