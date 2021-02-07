import { Injectable } from '@angular/core';
import { AnimalProviderModule } from '@animal/animal-provider.module';
import { Animal, AnimalType } from '@core/models';

interface ILivestockService {
  getSvgIcon(animal: Animal): string;
  getSvgIconByType(type: AnimalType): string;
  getSvgIconByString(type: string): string;
}

@Injectable({
  providedIn: AnimalProviderModule
})
export class LivestockService implements ILivestockService {
  public getSvgIcon(animal: Animal): string {
    if (animal === undefined || animal === null) {
      return null;
    }

    return this.getSvgIconByType(animal.type);
  }

  public getSvgIconByType(type: AnimalType): string {
    switch (type) {
      case AnimalType.Cattle:
        return 'cow';
      case AnimalType.Chicken:
        return 'chicken';
      case AnimalType.Pig:
        return 'pig';
      case AnimalType.Sheep:
        return 'sheep';
      default:
        return '';
    }
  }

  public getSvgIconByString(type: string): string {
    if (type === 'Cattle') {
      return 'cow';
    } else if (type === 'Chicken') {
      return 'chicken';
    } else if (type === 'Pig') {
      return 'pig';
    } else if (type === 'Sheep') {
      return 'sheep';
    } else {
      throw Error(type + ' not implemented');
    }
  }
}

export class MockLivestockService implements ILivestockService {
  public getSvgIcon(animal: Animal): string {
    return null;
  }
  public getSvgIconByType(type: AnimalType): string {
    return null;
  }
  public getSvgIconByString(type: string): string {
    return null;
  }
}
