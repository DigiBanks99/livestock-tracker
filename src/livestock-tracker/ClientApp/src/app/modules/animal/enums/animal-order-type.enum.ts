export enum AnimalOrderType {
  Number = 0,
  AnimalType = 1,
  BirthDate = 2,
  PurchaseDate = 3,
  DeathDate = 4
}

export namespace AnimalOrderType {
  export function getTypeFromString(property: string): AnimalOrderType | null {
    switch (property) {
      case 'age':
        return AnimalOrderType.BirthDate;
      case 'deceased':
        return AnimalOrderType.DeathDate;
      case 'subspecies':
        return AnimalOrderType.AnimalType;
      default:
        return AnimalOrderType.Number;
    }
  }
}
