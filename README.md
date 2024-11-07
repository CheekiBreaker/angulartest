# Angular Dynamic Form Generator

This project implements a dynamic form generator using Angular 18. It allows for the creation of forms based on JSON configuration, where each form element is a standalone Angular component.

## Features

- Dynamic form generation from JSON configuration
- Four types of form components:
  - Text Input
  - Select Dropdown
  - Number Input
  - Checkbox
- Form validation
- Support for field descriptions
- Required field handling
- Modifiable select options (active/inactive)
- Form data editing capability
- SCSS styling

## Components

1. `TestInputComponent`: Text input field
2. `TestSelectComponent`: Dropdown select with active/inactive options
3. `TestNumberComponent`: Numeric input field
4. `TestCheckboxComponent`: Checkbox field

## Form Configuration

The form is generated based on a JSON configuration that includes:

```typescript
interface FormField {
  type: 'input' | 'select' | 'number' | 'checkbox';
  name: string;
  label: string;
  description?: string;
  required?: boolean;
  choices?: string[];
  value?: any;
  disabled?: boolean;
}
```

## Usage

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Access the application at `http://localhost:4200`

## Form Data Model

The form data is collected in a single `TestForm` model:

```typescript
interface TestForm {
  [key: string]: any;
}
```

## Customization

- Modify `FormService` to change the form configuration
- Update component styles in their respective SCSS files
- Extend validation in `DynamicFormComponent`

## Development

This project uses:
- Angular 18
- SCSS for styling
- Reactive Forms for form handling
- Standalone components