import { pascalCase } from 'pascal-case';

import { AnimalOrderType } from './animal-order-type.enum';

export * from './animal-order-type.enum';

function getTypeFromString(property: string): AnimalOrderType | null {
  return AnimalOrderType[pascalCase(property)] ?? null;
}

export const AnimalOrderTypeUtils = { getTypeFromString };
