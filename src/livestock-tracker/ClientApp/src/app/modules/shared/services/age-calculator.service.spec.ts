import { AnimalType, Livestock } from '@core/models';

import { AgeCalculatorService } from './age-calculator.service';

describe('AgeCalculatorService', () => {
  let model: Livestock;
  const ageCalculatorService = new AgeCalculatorService();

  describe('calculateAge', () => {
    it('should return 0 days', () => {
      const now = new Date();
      model = new Livestock(
        1,
        AnimalType.Cattle,
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

    it('should return 1 day', () => {
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
        AnimalType.Cattle,
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

    it('should return 27 days', () => {
      const date = new Date(2020, 1, 11);
      const now = new Date(2020, 2, 9);
      model = new Livestock(
        1,
        AnimalType.Cattle,
        '',
        1,
        date,
        null,
        null,
        null,
        null,
        null
      );
      expect(ageCalculatorService.calculateAge(model.birthDate, now)).toBe(
        '27 days'
      );
    });

    it('should return 1 year', () => {
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
        AnimalType.Cattle,
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

    it('should return 1 year 4 months', () => {
      const now = new Date(2021, 7, 15);
      const date = new Date(2020, 3, 15);
      model = new Livestock(
        1,
        AnimalType.Cattle,
        '',
        1,
        date,
        null,
        null,
        null,
        null,
        null
      );
      expect(ageCalculatorService.calculateAge(model.birthDate, now)).toBe(
        '1 year 4 months'
      );
    });

    it('should return 1 year 4 months 3 days', () => {
      const date = new Date(2099, 11, 11);
      const now = new Date(2101, 3, 14);
      model = new Livestock(
        1,
        AnimalType.Cattle,
        '',
        1,
        date,
        null,
        null,
        null,
        null,
        null
      );
      expect(ageCalculatorService.calculateAge(model.birthDate, now)).toBe(
        '1 year 4 months 3 days'
      );
    });

    it('should return 4 months 1 day', () => {
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
        AnimalType.Cattle,
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

    it('should return 1 month 12 days', () => {
      const date = new Date(2020, 2, 11);
      const now = new Date(2020, 3, 23);
      model = new Livestock(
        1,
        AnimalType.Cattle,
        '',
        1,
        date,
        null,
        null,
        null,
        null,
        null
      );
      expect(ageCalculatorService.calculateAge(model.birthDate, now)).toBe(
        '1 month 12 days'
      );
    });

    it('should return 2 months 2 days when date between birth and death occurs', () => {
      const birthDate = new Date(2021, 11, 31);
      const dateOfDeath = new Date(2022, 1, 2);

      expect(ageCalculatorService.calculateAge(birthDate, dateOfDeath)).toBe(
        '2 months 2 days'
      );
    });
  });
});
