import { Injectable } from '@angular/core';
import { Animal, AnimalType } from '@core/models';
import { SvgProviderModule } from '@svg/svg-provider.module';

@Injectable({
  providedIn: SvgProviderModule
})
export class SvgService {
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
