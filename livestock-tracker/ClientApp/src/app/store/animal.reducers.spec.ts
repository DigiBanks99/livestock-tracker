import { animals, initialState } from './animal.reducers';
import { AddAnimal, RemoveAnimal, SelectAnimal } from './animal.actions';
import { Livestock } from '../livestock/livestock.model';
import { LiveStockType } from '../livestock/livestock-type.model';

describe('animals reducer', () => {
  it('should add another animal to the list when action is of type ADD_ANIMAL', () => {
    const animal1 = new Livestock(
      1,
      LiveStockType.Cattle,
      'fries',
      1,
      new Date(),
      new Date(),
      100,
      0,
      120,
      1
    );
    const addAnimalTask1 = new AddAnimal();
    addAnimalTask1.animal = animal1;
    const state1 = animals(initialState, addAnimalTask1);
    expect(state1).not.toBe(null);
    expect(state1.animals['1']).toBeDefined();
    expect(state1.animals['1'].id).toBe(animal1.id);
    expect(state1.animals['1'].number).toBe(animal1.number);
    expect(state1.animals['1'].arrivalWeight).toBe(animal1.arrivalWeight);
    expect(state1.animals['1'].type).toBe(LiveStockType.Cattle);

    const animal2 = new Livestock(
      2,
      LiveStockType.Chicken,
      'black',
      2,
      new Date(),
      new Date(),
      20,
      0,
      1,
      2
    );
    const addAnimalTask2 = new AddAnimal();
    addAnimalTask2.animal = animal2;

    const state2 = animals(state1, addAnimalTask2);
    expect(state2).not.toBe(null);
    expect(state2.animals['1']).toBeDefined();
    expect(state2.animals['1'].id).toBe(animal1.id);
    expect(state2.animals['1'].number).toBe(animal1.number);
    expect(state2.animals['1'].arrivalWeight).toBe(animal1.arrivalWeight);
    expect(state2.animals['1'].type).toBe(LiveStockType.Cattle);

    expect(state2.animals['2']).toBeDefined();
    expect(state2.animals['2'].id).toBe(animal2.id);
    expect(state2.animals['2'].number).toBe(animal2.number);
    expect(state2.animals['2'].arrivalWeight).toBe(animal2.arrivalWeight);
    expect(state2.animals['2'].type).toBe(LiveStockType.Chicken);

    const animal3 = new Livestock(
      3,
      LiveStockType.Pig,
      'fat',
      3,
      new Date(),
      new Date(),
      200,
      0,
      200,
      3
    );
    const addAnimalTask3 = new AddAnimal();
    addAnimalTask3.animal = animal3;

    const state3 = animals(state2, addAnimalTask3);
    expect(state3).not.toBe(null);
    expect(state3.animals['1']).toBeDefined();
    expect(state3.animals['1'].id).toBe(animal1.id);
    expect(state3.animals['1'].number).toBe(animal1.number);
    expect(state3.animals['1'].arrivalWeight).toBe(animal1.arrivalWeight);
    expect(state3.animals['1'].type).toBe(LiveStockType.Cattle);

    expect(state3.animals['2']).toBeDefined();
    expect(state3.animals['2'].id).toBe(animal2.id);
    expect(state3.animals['2'].number).toBe(animal2.number);
    expect(state3.animals['2'].arrivalWeight).toBe(animal2.arrivalWeight);
    expect(state3.animals['2'].type).toBe(LiveStockType.Chicken);

    expect(state3.animals['3']).toBeDefined();
    expect(state3.animals['3'].id).toBe(animal3.id);
    expect(state3.animals['3'].number).toBe(animal3.number);
    expect(state3.animals['3'].arrivalWeight).toBe(animal3.arrivalWeight);
    expect(state3.animals['3'].type).toBe(LiveStockType.Pig);
  });

  it('should remove the animal with the provided key if the action is of type REMOVE_ANIMAL', () => {
    const animal1 = new Livestock(
      1,
      LiveStockType.Cattle,
      'fries',
      1,
      new Date(),
      new Date(),
      100,
      0,
      120,
      1
    );
    const addAnimalTask1 = new AddAnimal();
    addAnimalTask1.animal = animal1;
    const state1 = animals(initialState, addAnimalTask1);

    const animal2 = new Livestock(
      2,
      LiveStockType.Chicken,
      'black',
      2,
      new Date(),
      new Date(),
      20,
      0,
      1,
      2
    );
    const addAnimalTask2 = new AddAnimal();
    addAnimalTask2.animal = animal2;
    const state2 = animals(state1, addAnimalTask2);

    const animal3 = new Livestock(
      3,
      LiveStockType.Pig,
      'fat',
      3,
      new Date(),
      new Date(),
      200,
      0,
      200,
      3
    );
    const addAnimalTask3 = new AddAnimal();
    addAnimalTask3.animal = animal3;
    const state3 = animals(state2, addAnimalTask3);

    const removeAnimal2 = new RemoveAnimal();
    removeAnimal2.key = '2';
    const state4 = animals(state3, removeAnimal2);
    expect(state4.animals['2']).toBeUndefined();
    expect(state4.animals['1']).toBeDefined();
    expect(state4.animals['3']).toBeDefined();

    const removeAnimal1 = new RemoveAnimal();
    removeAnimal1.key = '1';
    const state5 = animals(state4, removeAnimal1);
    expect(state5.animals['2']).toBeUndefined();
    expect(state5.animals['1']).toBeUndefined();
    expect(state5.animals['3']).toBeDefined();

    const removeAnimal3 = new RemoveAnimal();
    removeAnimal3.key = '3';
    const state6 = animals(state5, removeAnimal3);
    expect(state6.animals['2']).toBeUndefined();
    expect(state6.animals['1']).toBeUndefined();
    expect(state6.animals['3']).toBeUndefined();
  });

  it('should set selectedAnimal equal to the key of the action object when the type is of SELECT_ANIMAL', () => {
    expect(initialState.selectedAnimal).toEqual(null);

    const animal1 = new Livestock(
      1,
      LiveStockType.Cattle,
      'fries',
      1,
      new Date(),
      new Date(),
      100,
      0,
      120,
      1
    );
    const addAnimalTask1 = new AddAnimal();
    addAnimalTask1.animal = animal1;
    const state1 = animals(initialState, addAnimalTask1);

    const animal2 = new Livestock(
      2,
      LiveStockType.Chicken,
      'black',
      2,
      new Date(),
      new Date(),
      20,
      0,
      1,
      2
    );
    const addAnimalTask2 = new AddAnimal();
    addAnimalTask2.animal = animal2;
    const state2 = animals(state1, addAnimalTask2);

    const animal3 = new Livestock(
      3,
      LiveStockType.Pig,
      'fat',
      3,
      new Date(),
      new Date(),
      200,
      0,
      200,
      3
    );
    const addAnimalTask3 = new AddAnimal();
    addAnimalTask3.animal = animal3;
    const state3 = animals(state2, addAnimalTask3);

    const selectAnimal2 = new SelectAnimal();
    selectAnimal2.key = '2';
    const state4 = animals(state3, selectAnimal2);
    expect(state4.selectedAnimal).toEqual('2');

    const selectAnimal3 = new SelectAnimal();
    selectAnimal3.key = '3';
    const state5 = animals(state4, selectAnimal3);
    expect(state5.selectedAnimal).toEqual('3');
  });
});
