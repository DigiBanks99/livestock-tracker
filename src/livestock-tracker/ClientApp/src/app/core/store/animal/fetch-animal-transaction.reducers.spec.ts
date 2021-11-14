import { AnimalTransaction, SaveState } from '@core/models';
import { CrudState } from '@core/store/crud';
import { createEntityAdapter, Dictionary } from '@ngrx/entity';
import { Action } from '@ngrx/store';

import { fetchAnimalTransactionsActionFactory } from './fetch-animal-transaction.actions';
import { animalTransactionReducer } from './fetch-animal-transaction.reducers';

describe('animalTransactionReducer', () => {
  interface TestEntity extends AnimalTransaction {
    title: string;
  }
  interface TestState extends CrudState<TestEntity, number> {}

  const testKey = 'TEST';
  const entityAdapter = createEntityAdapter<TestEntity>();
  const testActions = fetchAnimalTransactionsActionFactory<TestEntity>(testKey);

  const testReducer = (s: TestState, a: Action): TestState =>
    animalTransactionReducer(testKey, entityAdapter, s, a);

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

  it('fetchAnimalTransactions should set isFetching to true and error to null with no other changes', () => {
    action = testActions.fetchAnimalTransactions(5, 10);
    expectedState = {
      ...initialState,
      isFetching: true,
      error: null
    };
    const newState = testReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  it('apiFetchAnimalTransactions should set isFetching to false, error to null and the appropriate entity, id and selectedId values', () => {
    const items: TestEntity[] = [
      { id: 1, animalId: 1, transactionDate: new Date(), title: 'test 1' },
      { id: 2, animalId: 1, transactionDate: new Date(), title: 'test 2' },
      { id: 3, animalId: 1, transactionDate: new Date(), title: 'test 3' },
      { id: 4, animalId: 1, transactionDate: new Date(), title: 'test 4' },
      { id: 5, animalId: 1, transactionDate: new Date(), title: 'test 5' }
    ];

    action = testActions.apiFetchAnimalTransactions(1, {
      data: items,
      pageSize: 10,
      currentPage: 0,
      pageCount: items.length / 10,
      totalRecordCount: items.length
    });
    const entities: Dictionary<TestEntity> = {};
    items.forEach((item) => (entities[item.id] = item));

    expectedState = {
      ...initialState,
      isFetching: false,
      error: null,
      entities,
      ids: items.map((item) => item.id),
      selectedId: items[0].id,
      pageSize: 10,
      pageNumber: 0,
      recordCount: items.length
    };

    const state: TestState = {
      ...initialState,
      isFetching: true,
      error: new Error('not null')
    };
    const newState = testReducer(state, action);
    expect(newState).toEqual(expectedState);
  });
});
