import { Animal, AnimalType } from '@core/models';

/**
 * Use this to test animals with long subspecies values.
 */
export const LongSubspecies: Animal = {
  id: 1,
  type: AnimalType.Chicken,
  subspecies:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac rutrum metus. Quisque urna nibh, elementum nec sollicitudin at, venenatis quis urna. Duis at scelerisque purus, id pulvinar neque. Suspendisse justo ligula, ullamcorper at dolor id, consequat convallis tellus. Aliquam commodo risus sed ornare convallis. Nam enim eros, pellentesque at tellus sit amet, efficitur luctus lacus. Duis sapien diam, molestie vel arcu sed, laoreet aliquet ipsum. Ut maximus blandit ante, ac mattis nunc blandit ac. Etiam rutrum nisi est, ac pretium tortor rhoncus ac. Donec augue tellus, imperdiet consequat porta at, interdum et enim. Nam sollicitudin nibh enim, id imperdiet lorem mollis sit amet. Pellentesque pharetra laoreet nisi, sit amet scelerisque quam accumsan sit amet.',
  number: 55,
  birthDate: new Date(),
  purchaseDate: new Date(),
  purchasePrice: 20,
  sellPrice: null,
  arrivalWeight: 1,
  batchNumber: 2,
  dateOfDeath: null,
  deceased: false,
  sellDate: null,
  sold: false,
  archived: false
};

/**
 * Use this to test animals with short subspecies values.
 */
export const ShortSubspecies: Animal = {
  id: 1,
  type: AnimalType.Chicken,
  subspecies: 'Aw',
  number: 55,
  birthDate: new Date(),
  purchaseDate: new Date(),
  purchasePrice: 20,
  sellPrice: null,
  arrivalWeight: 1,
  batchNumber: 2,
  dateOfDeath: null,
  deceased: false,
  sellDate: null,
  sold: false,
  archived: false
};

/**
 * A long list of animals.
 */
export const LongAnimalList: Animal[] = [
  {
    id: 1,
    type: AnimalType.Chicken,
    subspecies: 'Roberto',
    number: 55,
    birthDate: new Date(),
    purchaseDate: new Date(),
    purchasePrice: 20,
    sellPrice: null,
    arrivalWeight: 1,
    batchNumber: 2,
    dateOfDeath: null,
    deceased: false,
    sellDate: null,
    sold: false,
    archived: false
  },
  {
    id: 2,
    type: AnimalType.Chicken,
    subspecies:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac rutrum metus. Quisque urna nibh, elementum nec sollicitudin at, venenatis quis urna. Duis at scelerisque purus, id pulvinar neque. Suspendisse justo ligula, ullamcorper at dolor id, consequat convallis tellus. Aliquam commodo risus sed ornare convallis. Nam enim eros, pellentesque at tellus sit amet, efficitur luctus lacus. Duis sapien diam, molestie vel arcu sed, laoreet aliquet ipsum. Ut maximus blandit ante, ac mattis nunc blandit ac. Etiam rutrum nisi est, ac pretium tortor rhoncus ac. Donec augue tellus, imperdiet consequat porta at, interdum et enim. Nam sollicitudin nibh enim, id imperdiet lorem mollis sit amet. Pellentesque pharetra laoreet nisi, sit amet scelerisque quam accumsan sit amet.',
    number: 56,
    birthDate: new Date(),
    purchaseDate: new Date(),
    purchasePrice: 20,
    sellPrice: null,
    arrivalWeight: 1,
    batchNumber: 2,
    dateOfDeath: null,
    deceased: false,
    sellDate: null,
    sold: false,
    archived: false
  },
  {
    id: 3,
    type: AnimalType.Cattle,
    subspecies: 'Lola',
    number: 57,
    birthDate: new Date(),
    purchaseDate: new Date(),
    purchasePrice: 120,
    sellPrice: null,
    arrivalWeight: 25,
    batchNumber: 1,
    dateOfDeath: null,
    deceased: false,
    sellDate: null,
    sold: false,
    archived: false
  }
];

/**
 * A short list of animals.
 */
export const ShortAnimalList: Animal[] = [
  {
    id: 1,
    type: AnimalType.Chicken,
    subspecies: 'Roberto',
    number: 55,
    birthDate: new Date(),
    purchaseDate: new Date(),
    purchasePrice: 20,
    sellPrice: null,
    arrivalWeight: 1,
    batchNumber: 2,
    dateOfDeath: null,
    deceased: false,
    sellDate: null,
    sold: false,
    archived: false
  },
  {
    id: 2,
    type: AnimalType.Chicken,
    subspecies: 'Firmino',
    number: 56,
    birthDate: new Date(),
    purchaseDate: new Date(),
    purchasePrice: 20,
    sellPrice: null,
    arrivalWeight: 1,
    batchNumber: 2,
    dateOfDeath: null,
    deceased: false,
    sellDate: null,
    sold: false,
    archived: false
  },
  {
    id: 3,
    type: AnimalType.Cattle,
    subspecies: 'Lola',
    number: 57,
    birthDate: new Date(),
    purchaseDate: new Date(),
    purchasePrice: 120,
    sellPrice: null,
    arrivalWeight: 25,
    batchNumber: 1,
    dateOfDeath: null,
    deceased: false,
    sellDate: null,
    sold: false,
    archived: false
  }
];
