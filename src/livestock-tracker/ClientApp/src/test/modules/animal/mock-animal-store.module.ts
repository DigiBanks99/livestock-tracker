import { NgModule } from '@angular/core';
import { provideMockStore } from '@ngrx/store/testing';
import {
  getAnimals,
  getSelectedAnimal,
  getSelectedAnimalId
} from '@core/store/selectors';
import { LongAnimalList, ShortSubspecies } from '@test/animal/test-data';

@NgModule({
  providers: [
    provideMockStore({
      selectors: [
        { selector: getAnimals, value: [...LongAnimalList] },
        { selector: getSelectedAnimal, value: ShortSubspecies },
        { selector: getSelectedAnimalId, value: ShortSubspecies.id }
      ]
    })
  ]
})
export class MockAnimalStoreModule {}
