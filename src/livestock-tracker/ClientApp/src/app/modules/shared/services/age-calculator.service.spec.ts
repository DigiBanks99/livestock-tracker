import { AgeCalculatorService } from './age-calculator.service';

describe('AgeCalculatorService', () => {
  const ageCalculatorService = new AgeCalculatorService();

  describe('calculateAge', () => {
    it('should return 0 days for today', () => {
      const today = new Date();

      expect(ageCalculatorService.calculateAge(today)).toBe('0 days');
    });

    it('should return 1 day for yesterday', () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      expect(ageCalculatorService.calculateAge(yesterday)).toBe('1 day');
    });

    it('should return 27 days', () => {
      const date = new Date(2020, 1, 11);
      const now = new Date(2020, 2, 9);

      expect(ageCalculatorService.calculateAge(date, now)).toBe('27 days');
    });

    it('should return 1 year', () => {
      const now = new Date(2022, 0, 1);
      const date = new Date(2021, 0, 1);

      expect(ageCalculatorService.calculateAge(date, now)).toBe('1 year');
    });

    it('should return 1 year 4 months', () => {
      const date = new Date(2020, 2, 15);
      const now = new Date(2021, 6, 15);

      expect(ageCalculatorService.calculateAge(date, now)).toBe(
        '1 year 4 months'
      );
    });

    it('should return 1 year 4 months 3 days', () => {
      const date = new Date(2099, 10, 11);
      const now = new Date(2101, 3, 14);

      expect(ageCalculatorService.calculateAge(date, now)).toBe(
        '1 year 4 months 3 days'
      );
    });

    it('should return 15 days when crossing new-year', () => {
      const date = new Date(2021, 11, 30);
      const now = new Date(2022, 0, 14);

      expect(ageCalculatorService.calculateAge(date, now)).toBe('15 days');
    });

    it('should return 4 months 1 day', () => {
      const date = new Date(2023, 2, 28);
      const now = new Date(2023, 6, 29);

      expect(ageCalculatorService.calculateAge(date, now)).toBe(
        '4 months 1 day'
      );
    });

    it('should return 1 month 12 days', () => {
      const date = new Date(2020, 1, 11);
      const now = new Date(2020, 2, 23);

      expect(ageCalculatorService.calculateAge(date, now)).toBe(
        '1 month 12 days'
      );
    });

    it('should return 2 months 2 days when date between birth and death occurs', () => {
      const birthDate = new Date(2021, 10, 30);
      const dateOfDeath = new Date(2022, 1, 2);

      expect(ageCalculatorService.calculateAge(birthDate, dateOfDeath)).toBe(
        '2 months 2 days'
      );
    });
  });
});
