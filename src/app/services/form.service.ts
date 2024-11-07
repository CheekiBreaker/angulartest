import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { FormField } from '../models/form-field.model';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  // Simulating server response
  getFormConfig(): Observable<FormField[]> {
    const mockConfig: FormField[] = [
      {
        type: 'input',
        name: 'firstName',
        label: 'Имя',
        description: 'Введите имя',
        required: true,
      },
      {
        type: 'number',
        name: 'age',
        label: 'Возраст',
        description: 'Введите возраст',
        required: true,
      },
      {
        type: 'select',
        name: 'marital',
        label: 'Семейное положение',
        description: '',
        required: true,
        choices: ['не женат/не замужем', 'женат/замужем'],
      },
      {
        type: 'input',
        name: 'university',
        label: 'ВУЗ',
        required: true,
      },
      {
        type: 'select',
        name: 'country',
        label: 'Место рождения',
        description: 'Выберите город',
        required: true,
        choices: ['не важно', 'Москва', 'Ленинград', 'Владивосток', 'Тюмень'],
      },
      {
        type: 'checkbox',
        name: 'selectAll',
        label: 'Выделить все',
      },
      {
        type: 'checkbox',
        name: 'communication',
        label: 'Общение',
      },
      {
        type: 'checkbox',
        name: 'languages',
        label: 'Иностранные языки',
      },
      {
        type: 'checkbox',
        name: 'obstacles',
        label: 'Бег с препятствиями',
      },
      {
        type: 'checkbox',
        name: 'speedReading',
        label: 'Быстрое чтение',
      },
      {
        type: 'checkbox',
        name: 'selfDefense',
        label: 'Самозащита',
      },
      {
        type: 'checkbox',
        name: 'driving',
        label: 'Вождение',
      },
      {
        type: 'checkbox',
        name: 'programming',
        label: 'Программирование',
      },
      {
        type: 'checkbox',
        name: 'helicopter',
        label: 'Управление вертолетом',
      },
      {
        type: 'checkbox',
        name: 'operaSinging',
        label: 'Оперное пение',
      },
    ];

    return of(mockConfig);
  }
}