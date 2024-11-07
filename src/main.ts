import { bootstrapApplication } from '@angular/platform-browser';
import { Component } from '@angular/core';
import { DynamicFormComponent } from './app/components/dynamic-form/dynamic-form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [DynamicFormComponent],
  template: `
    <div class="container">
      <h1>Анкета</h1>
      <app-dynamic-form></app-dynamic-form>
    </div>
  `,
  styles: [
    `
    .container {
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }
    
    h1 {
      text-align: center;
      margin-bottom: 2rem;
    }
  `,
  ],
})
export class App {
  name = 'Dynamic Form Generator';
}

bootstrapApplication(App);
