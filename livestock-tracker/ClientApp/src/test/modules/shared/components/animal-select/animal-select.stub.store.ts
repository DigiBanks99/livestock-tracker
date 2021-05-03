import { Animal } from '@core/models';
import { getAnimals, getSelectedAnimal } from '@core/store/selectors';
import { provideMockStore } from '@ngrx/store/testing';
import { LongAnimalList } from '@test/animal/test-data';

export const provideAnimalSelectMockStore = (
  animals: Animal[] = LongAnimalList,
  selectedIndex = 0
) =>
  provideMockStore({
    selectors: [
      {
        selector: getAnimals,
        value: animals
      },
      {
        selector: getSelectedAnimal,
        value: animals[selectedIndex] || null
      }
    ]
  });
