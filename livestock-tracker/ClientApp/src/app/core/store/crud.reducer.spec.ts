import { SaveState } from '@core/models';
import { KeyEntity } from '@core/models/key-entity.interface';
import { createEntityAdapter, Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';

import { crudActionsFactory } from './';
import { CrudState } from './crud-state.interface';
import { crudReducer } from './crud.reducer';

interface TestEntity extends KeyEntity<number> {
  title: string;
}
interface TestState extends CrudState<TestEntity, number> {}

const testKey = 'TEST';
const entityAdapter = createEntityAdapter<TestEntity>();
const testActions = crudActionsFactory<TestEntity, number>(testKey);

describe('Crud Reducers', () => {
  const testReducer = (s: TestState, a: Action): TestState =>
    crudReducer(testKey, entityAdapter, s, a);

  let initialState: TestState;
  let expectedState: TestState;
  let action: Action;

  beforeEach(() => {
    initialState = entityAdapter.getInitialState({
      selectedId: null,
      isPending: false,
      isFetching: false,
      error: null,
      entities: {},
      ids: [],
      pageNumber: 0,
      pageSize: 10,
      recordCount: 0,
      saveState: SaveState.New
    });
  });

  it('addItem should set isPending to true and error to null with no other changes', () => {
    action = testActions.addItem({ id: 99, title: 'test' });
    expectedState = { ...initialState, isPending: true, error: null };
    const newState = testReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it('updateItem should set isPending to true and error to null with no other changes', () => {
    action = testActions.updateItem({ id: 99, title: 'test' }, 99);
    expectedState = { ...initialState, isPending: true, error: null };
    const newState = testReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it('deleteItem should set isPending to true and error to null with no other changes', () => {
    action = testActions.deleteItem(99);
    expectedState = { ...initialState, isPending: true, error: null };
    const newState = testReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it('fetchItems should set isPending to true and error to null with no other changes', () => {
    action = testActions.fetchItems();
    expectedState = { ...initialState, isPending: true, error: null };
    const newState = testReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it('apiError should set isPending to false and error to the error value with no other changes', () => {
    const error = new Error('test error');
    action = testActions.apiError(error);
    expectedState = { ...initialState, isPending: false, error };
    const newState = testReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it('apiFetchItems should set isPending to false, error to null and the appropriate entity, id and selectedId values', () => {
    const items: TestEntity[] = [
      { id: 1, title: 'test 1' },
      { id: 2, title: 'test 2' },
      { id: 3, title: 'test 3' },
      { id: 4, title: 'test 4' },
      { id: 5, title: 'test 5' }
    ];

    action = testActions.apiFetchItems({
      data: items,
      pageSize: 10,
      currentPage: 0,
      pageCount: items.length / 10,
      totalRecordCount: items.length
    });
    const entities = {};
    items.forEach((item) => (entities[item.id] = item));

    expectedState = {
      ...initialState,
      isPending: false,
      error: null,
      entities,
      ids: items.map((item) => item.id),
      selectedId: items[0].id
    };

    const state: TestState = {
      ...initialState,
      isPending: true,
      error: new Error('not null')
    };
    const newState = testReducer(state, action);
    expect(newState).toEqual(expectedState);
  });

  it('apiAddItem should set isPending to false, error to null and add the item to the entities and id to the ids', () => {
    const item: TestEntity = { id: 99, title: 'test 99' };
    const state: TestState = {
      ...initialState,
      isPending: true,
      error: new Error('not null'),
      entities: { 1: { id: 1, title: 'test 1' } },
      ids: [1]
    };

    const entities = {
      ...state.entities,
      [99]: item
    };

    const ids = Object.keys(entities).map((key) => +key);
    expectedState = {
      ...state,
      isPending: false,
      error: null,
      entities,
      ids,
      selectedId: item.id
    };

    action = testActions.apiAddItem(item);
    const newState = testReducer(state, action);
    expect(newState).toEqual(expectedState);
  });

  it('apiUpdateItem should set isPending to false, error to null and update the entity at index 1 to have the new title', () => {
    const updateItem: Update<TestEntity> = {
      changes: { id: 1, title: 'updated' },
      id: 1
    };
    const state: TestState = {
      ...initialState,
      isPending: true,
      error: new Error('not null'),
      entities: { 1: { id: 1, title: 'test' } },
      ids: [1]
    };
    expectedState = {
      ...state,
      isPending: false,
      error: null,
      entities: {
        [1]: { id: 1, title: 'updated' }
      },
      selectedId: updateItem.id
    };

    action = testActions.apiUpdateItem(updateItem, 1);
    const newState = testReducer(state, action);
    expect(newState).toEqual(expectedState);
  });

  it('apiDeleteItem should set isPending to false, error to null and move the selected id back one index and remove the entity and id reference', () => {
    const state: TestState = {
      ...initialState,
      isPending: true,
      error: new Error('not null'),
      entities: {
        1: { id: 1, title: 'test 1' },
        2: { id: 2, title: 'test 2' }
      },
      ids: [1, 2],
      selectedId: 2
    };

    expectedState = {
      ...state,
      isPending: false,
      error: null,
      entities: { 1: { id: 1, title: 'test 1' } },
      ids: [1],
      selectedId: 1
    };

    action = testActions.apiDeleteItem(2);
    let newState = testReducer(state, action);
    expect(newState).toEqual(expectedState);

    expectedState = {
      ...expectedState,
      entities: {},
      ids: [],
      selectedId: null
    };

    action = testActions.apiDeleteItem(1);
    newState = testReducer(newState, action);
    expect(newState).toEqual(expectedState);
  });
});
