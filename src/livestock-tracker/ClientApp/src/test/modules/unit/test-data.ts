import { Unit } from '@core/models';

const units: Unit[] = [
  { id: 1, description: 'ml' },
  { id: 2, description: 'l' },
  { id: 3, description: 'mg' },
  { id: 4, description: 'g' },
  { id: 5, description: 'kg' },
  { id: 6, description: 'tsp' },
  { id: 7, description: 'tbsp' },
  { id: 8, description: 'cup' },
  { id: 9, description: 'mm' },
  { id: 10, description: 'cm' },
  { id: 11, description: 'm' }
];

export interface UnitTestData {
  ShortList: Unit[];
  LongList: Unit[];
}

export const TestData: UnitTestData = {
  ShortList: units.slice(0, 5),
  LongList: [...units]
};
