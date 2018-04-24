import { Livestock } from './livestock.model';
import { LiveStockType } from './livestock-type.model';

describe('LivestockModel', () => {
  let model: Livestock;

  it('#getAge should return 1 year', () => {
    const now = new Date();
    const date = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
    model = new Livestock(1, LiveStockType.Cattle, '', 1, date, null, null, null, null, null);
    expect(model.getAge()).toBe('1 year');
  });

  it('#getAge should return 1 year 4 months', () => {
    const now = new Date();
    const date = new Date(now.getFullYear() - 1, now.getMonth() + 4, now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
    model = new Livestock(1, LiveStockType.Cattle, '', 1, date, null, null, null, null, null);
    expect(model.getAge()).toBe('1 year 4 months');
  });

  it('#getAge should return 1 year 4 months 3 days', () => {
    const now = new Date();
    const newYear = now.getFullYear() - 1;
    const newMonth = now.getMonth() + 4;
    const newDays = now.getDate() + 3;
    const date = new Date(newYear, newMonth, newDays, now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
    model = new Livestock(1, LiveStockType.Cattle, '', 1, date, null, null, null, null, null);
    expect(model.getAge()).toBe('1 year 4 months 3 days');
  });

  it('#getAge should return 4 months 1 day', () => {
    const now = new Date();
    const newYear = now.getFullYear();
    const newMonth = now.getMonth() + 4;
    const newDays = now.getDate() + 1;
    const date = new Date(newYear, newMonth, newDays, now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
    model = new Livestock(1, LiveStockType.Cattle, '', 1, date, null, null, null, null, null);
    expect(model.getAge()).toBe('4 months 1 day');
  });

  it('#getAge should return 28 days', () => {
    const now = new Date();
    const newYear = now.getFullYear();
    const newMonth = now.getMonth();
    const newDays = now.getDate() + 28;
    const date = new Date(newYear, newMonth, newDays, now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());
    model = new Livestock(1, LiveStockType.Cattle, '', 1, date, null, null, null, null, null);
    expect(model.getAge()).toBe('28 days');
  });

  function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
  }
});
