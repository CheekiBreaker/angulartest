export interface FormField {
  type: 'input' | 'select' | 'number' | 'checkbox';
  name: string;
  label: string;
  description?: string;
  required?: boolean;
  choices?: string[];
  value?: any;
  disabled?: boolean;
}

export interface TestForm {
  [key: string]: any;
}