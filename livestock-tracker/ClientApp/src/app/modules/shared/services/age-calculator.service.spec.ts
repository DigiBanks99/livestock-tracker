import { LiveStockType } from '@core/models/livestock-type.model';
import { Livestock } from '@core/models/livestock.model';

import { AgeCalculatorService } from './age-calculator.service';

describe('AgeCalculatorService', () => {
  let model: Livestock;
  const ageCalculatorService = new AgeCalculatorService();

  it('#calculateAge should return 0 days', () => {
    const now = new Date();
    model = new Livestock(
      1,
      LiveStockType.Cattle,
      '',
      1,
      now,
      null,
      null,
      null,
      null,
      null
    );
    expect(ageCalculatorService.calculateAge(model.birthDate)).toBe('0 days');
  });

  it('#calculateAge should return 1 day', () => {
    const now = new Date();
    const newYear = now.getFullYear();
    const newMonth = now.getMonth();
    const newDays = now.getDate() - 1;
    const date = new Date(
      newYear,
      newMonth,
      newDays,
      now.getHours(),
      now.getMinutes(),
      now.getSeconds(),
      now.getMilliseconds()
    );
    model = new Livestock(
      1,
      LiveStockType.Cattle,
      '',
      1,
      date,
      null,
      null,
      null,
      null,
      null
    );
    expect(ageCalculatorService.calculateAge(model.birthDate)).toBe('1 day');
  });

  it('#calculateAge should return 27 days', () => {
    const now = new Date();
    const newYear = now.getFullYear();
    const newMonth = now.getMonth();
    const newDays = now.getDate() - 27;
    const date = new Date(
      newYear,
      newMonth,
      newDays,
      now.getHours(),
      now.getMinutes(),
      now.getSeconds(),
      now.getMilliseconds()
    );
    model = new Livestock(
      1,
      LiveStockType.Cattle,
      '',
      1,
      date,
      null,
      null,
      null,
      null,
      null
    );
    expect(ageCalculatorService.calculateAge(model.birthDate)).toBe('27 days');
  });

  it('#calculateAge should return 1 year', () => {
    const now = new Date();
    const date = new Date(
      now.getFullYear() - 1,
      now.getMonth(),
      now.getDate(),
      now.getHours(),
      now.getMinutes(),
      now.getSeconds(),
      now.getMilliseconds()
    );
    model = new Livestock(
      1,
      LiveStockType.Cattle,
      '',
      1,
      date,
      null,
      null,
      null,
      null,
      null
    );
    expect(ageCalculatorService.calculateAge(model.birthDate)).toBe('1 year');
  });

  it('#calculateAge should return 1 year 4 months', () => {
    const now = new Date();
    const date = new Date(
      now.getFullYear() - 1,
      now.getMonth() - 4,
      now.getDate(),
      now.getHours(),
      now.getMinutes(),
      now.getSeconds(),
      now.getMilliseconds()
    );
    model = new Livestock(
      1,
      LiveStockType.Cattle,
      '',
      1,
      date,
      null,
      null,
      null,
      null,
      null
    );
    expect(ageCalculatorService.calculateAge(model.birthDate)).toBe(
      '1 year 4 months'
    );
  });

  it('#calculateAge should return 1 year 4 months 3 days', () => {
    const now = new Date();
    const newYear = now.getFullYear() - 1;
    const newMonth = now.getMonth() - 4;
    const newDays = now.getDate() - 3;
    const date = new Date(
      newYear,
      newMonth,
      newDays,
      now.getHours(),
      now.getMinutes(),
      now.getSeconds(),
      now.getMilliseconds()
    );
    model = new Livestock(
      1,
      LiveStockType.Cattle,
      '',
      1,
      date,
      null,
      null,
      null,
      null,
      null
    );
    expect(ageCalculatorService.calculateAge(model.birthDate)).toBe(
      '1 year 4 months 3 days'
    );
  });

  it('#calculateAge should return 4 months 1 day', () => {
    const now = new Date();
    const newYear = now.getFullYear();
    const newMonth = now.getMonth() - 4;
    const newDays = now.getDate() - 1;
    const date = new Date(
      newYear,
      newMonth,
      newDays,
      now.getHours(),
      now.getMinutes(),
      now.getSeconds(),
      now.getMilliseconds()
    );
    model = new Livestock(
      1,
      LiveStockType.Cattle,
      '',
      1,
      date,
      null,
      null,
      null,
      null,
      null
    );
    expect(ageCalculatorService.calculateAge(model.birthDate)).toBe(
      '4 months 1 day'
    );
  });

  it('#calculateAge should return 1 month 12 days', () => {
    const now = new Date();
    const newYear = now.getFullYear();
    const newMonth = now.getMonth() - 1;
    const newDays = now.getDate() - 12;
    const date = new Date(
      newYear,
      newMonth,
      newDays,
      now.getHours(),
      now.getMinutes(),
      now.getSeconds(),
      now.getMilliseconds()
    );
    model = new Livestock(
      1,
      LiveStockType.Cattle,
      '',
      1,
      date,
      null,
      null,
      null,
      null,
      null
    );
    expect(ageCalculatorService.calculateAge(model.birthDate)).toBe(
      '1 month 12 days'
    );
  });

  it('#calculateAge should return 2 months 2 days when date between birth and death occurs', () => {
    const now = new Date();
    const newYear = now.getFullYear();
    const newMonth = now.getMonth() - 1;
    const newDays = now.getDate() - 12;
    const birthDate = new Date(
      newYear,
      newMonth,
      newDays,
      now.getHours(),
      now.getMinutes(),
      now.getSeconds(),
      now.getMilliseconds()
    );

    const dateOfDeath = new Date(
      birthDate.getFullYear(),
      birthDate.getMonth() + 2,
      birthDate.getDate() + 2,
      birthDate.getHours(),
      birthDate.getMinutes(),
      birthDate.getSeconds(),
      birthDate.getMilliseconds()
    );
    expect(ageCalculatorService.calculateAge(birthDate, dateOfDeath)).toBe(
      '2 months 2 days'
    );
  });
});
