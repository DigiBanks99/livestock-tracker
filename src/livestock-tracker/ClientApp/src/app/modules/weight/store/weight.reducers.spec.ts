import { SaveState } from '@core/models';
import { PagedData } from '@core/models/paged-data.model';
import { Dictionary, Update } from '@ngrx/entity';
import { WeightState, WeightTransaction } from '@weight/interfaces';
import { WeightStore } from '@weight/store';
import { initialState } from '@weight/store/weight.reducers';

describe('weightReducer', () => {
  describe('ADD_weight', () => {
    it('should set saveState to Saving', () => {
      // Arrange
      const state: WeightState = { ...initialState };
      const item: WeightTransaction = {
        animalId: 1,
        id: 1,
        transactionDate: new Date(),
        weight: 88
      };
      const action = WeightStore.actions.addItem(item);

      // Act
      const result = WeightStore.reducers.weightReducer(state, action);

      // Assert
      expect(result.saveState).toEqual(SaveState.Saving);
    });

    it('should set isPending to true', () => {
      // Arrange
      const state: WeightState = { ...initialState, isPending: false };
      const item: WeightTransaction = {
        animalId: 1,
        id: 1,
        transactionDate: new Date(),
        weight: 88
      };
      const action = WeightStore.actions.addItem(item);

      // Act
      const result = WeightStore.reducers.weightReducer(state, action);

      // Assert
      expect(result.isPending).toBeTrue();
    });

    it('should set error to null', () => {
      // Arrange
      const state: WeightState = {
        ...initialState,
        error: new Error('some error')
      };
      const item: WeightTransaction = {
        animalId: 1,
        id: 1,
        transactionDate: new Date(),
        weight: 88
      };
      const action = WeightStore.actions.addItem(item);

      // Act
      const result = WeightStore.reducers.weightReducer(state, action);

      // Assert
      expect(result.error).toBeNull();
    });
  });

  describe('API_ADD_weight', () => {
    it('should add a weight transaction to the store', () => {
      // Arrange
      const state: WeightState = { ...initialState };
      const item: WeightTransaction = {
        animalId: 1,
        id: 1,
        transactionDate: new Date(),
        weight: 88
      };
      const action = WeightStore.actions.apiAddItem(item);

      // Act
      const result = WeightStore.reducers.weightReducer(state, action);

      // Assert
      expect(result.ids.length).toBe(1);
      expect(result.entities[1]).not.toBeNull();
      expect(result.entities[1].id).toEqual(item.id);
      expect(result.entities[1].animalId).toEqual(item.animalId);
      expect(result.entities[1].transactionDate).toEqual(item.transactionDate);
      expect(result.entities[1].weight).toEqual(item.weight);
    });

    it('should set saveState to Success', () => {
      // Arrange
      const state: WeightState = { ...initialState };
      const item: WeightTransaction = {
        animalId: 1,
        id: 1,
        transactionDate: new Date(),
        weight: 88
      };
      const action = WeightStore.actions.apiAddItem(item);

      // Act
      const result = WeightStore.reducers.weightReducer(state, action);

      // Assert
      expect(result.saveState).toEqual(SaveState.Success);
    });

    it('should set selectedId to the id of the added item', () => {
      // Arrange
      const state: WeightState = { ...initialState };
      const item: WeightTransaction = {
        animalId: 1,
        id: 1,
        transactionDate: new Date(),
        weight: 88
      };
      const action = WeightStore.actions.apiAddItem(item);

      // Act
      const result = WeightStore.reducers.weightReducer(state, action);

      // Assert
      expect(result.selectedId).toEqual(item.id);
    });

    it('should set isPending to false', () => {
      // Arrange
      const state: WeightState = { ...initialState, isPending: true };
      const item: WeightTransaction = {
        animalId: 1,
        id: 1,
        transactionDate: new Date(),
        weight: 88
      };
      const action = WeightStore.actions.apiAddItem(item);

      // Act
      const result = WeightStore.reducers.weightReducer(state, action);

      // Assert
      expect(result.isPending).toBeFalse();
    });

    it('should set error to null', () => {
      // Arrange
      const state: WeightState = {
        ...initialState,
        error: new Error('some error')
      };
      const item: WeightTransaction = {
        animalId: 1,
        id: 1,
        transactionDate: new Date(),
        weight: 88
      };
      const action = WeightStore.actions.apiAddItem(item);

      // Act
      const result = WeightStore.reducers.weightReducer(state, action);

      // Assert
      expect(result.error).toBeNull();
    });
  });

  describe('DELETE_weight', () => {
    it('should set isPending to true', () => {
      // Arrange
      const state: WeightState = { ...initialState, isPending: false };
      const action = WeightStore.actions.deleteItem(1);

      // Act
      const result = WeightStore.reducers.weightReducer(state, action);

      // Assert
      expect(result.isPending).toBeTrue();
    });

    it('should set error to null', () => {
      // Arrange
      const state: WeightState = {
        ...initialState,
        error: new Error('some error')
      };
      const action = WeightStore.actions.deleteItem(1);

      // Act
      const result = WeightStore.reducers.weightReducer(state, action);

      // Assert
      expect(result.error).toBeNull();
    });
  });

  describe('API_DELETE_weight', () => {
    it('should remove the weight transaction with the given ID from the store', () => {
      // Arrange
      const id = 1;
      const state: WeightState = {
        ...initialState,
        ids: [id],
        entities: {
          [id]: { id, animalId: 1, transactionDate: new Date(), weight: 88 }
        }
      };
      const action = WeightStore.actions.apiDeleteItem(id);

      // Act
      const result = WeightStore.reducers.weightReducer(state, action);

      // Assert
      expect(result.ids.length).toBe(0);
      expect(result.entities[id]).toBeUndefined();
    });

    it('should set selectedId to the next transaction id if one exists', () => {
      // Arrange
      const id1 = 1;
      const id2 = 2;
      const state: WeightState = {
        ...initialState,
        ids: [id1, id2],
        entities: {
          [id1]: {
            id: id1,
            animalId: 1,
            transactionDate: new Date(),
            weight: 88
          },
          [id2]: {
            id: id2,
            animalId: 1,
            transactionDate: new Date(),
            weight: 90
          }
        }
      };
      const action = WeightStore.actions.apiDeleteItem(id1);

      // Act
      const result = WeightStore.reducers.weightReducer(state, action);

      // Assert
      expect(result.ids.length).toBe(1);
      expect(result.entities[id1]).toBeUndefined();
      expect(result.entities[id2]).toBeDefined();
      expect(result.selectedId).toEqual(id2);
    });

    it('should set isPending to false', () => {
      // Arrange
      const state: WeightState = { ...initialState, isPending: false };
      const action = WeightStore.actions.apiDeleteItem(1);

      // Act
      const result = WeightStore.reducers.weightReducer(state, action);

      // Assert
      expect(result.isPending).toBeFalse();
    });

    it('should set error to null', () => {
      // Arrange
      const state: WeightState = {
        ...initialState,
        error: new Error('some error')
      };
      const action = WeightStore.actions.apiDeleteItem(1);

      // Act
      const result = WeightStore.reducers.weightReducer(state, action);

      // Assert
      expect(result.error).toBeNull();
    });
  });

  describe('API_ERROR_weight', () => {
    it('should set error to the given Error', () => {
      // Arrange
      const state: WeightState = {
        ...initialState,
        error: new Error('some error')
      };
      const newError = new Error('The final error');
      const action = WeightStore.actions.apiError(newError);

      // Act
      const result = WeightStore.reducers.weightReducer(state, action);

      // Assert
      expect(result.error.message).toEqual(newError.message);
      expect(result.error.stack).toEqual(newError.stack);
      expect(result.error.name).toEqual(newError.name);
    });

    it('should set isPending to false', () => {
      // Arrange
      const state: WeightState = {
        ...initialState,
        isPending: true
      };
      const newError = new Error('The final error');
      const action = WeightStore.actions.apiError(newError);

      // Act
      const result = WeightStore.reducers.weightReducer(state, action);

      // Assert
      expect(result.isPending).toBeFalse();
    });

    it('should set isFetching to false', () => {
      // Arrange
      const state: WeightState = {
        ...initialState,
        isFetching: true
      };
      const newError = new Error('The final error');
      const action = WeightStore.actions.apiError(newError);

      // Act
      const result = WeightStore.reducers.weightReducer(state, action);

      // Assert
      expect(result.isFetching).toBeFalse();
    });
  });

  describe('FETCH_weight', () => {
    it('should set isPending to true', () => {
      // Arrange
      const state: WeightState = { ...initialState, isPending: false };
      const action = WeightStore.actions.fetchItems();

      // Act
      const result = WeightStore.reducers.weightReducer(state, action);

      // Assert
      expect(result.isPending).toBeTrue();
    });

    it('should set isFetching to true', () => {
      // Arrange
      const state: WeightState = { ...initialState, isFetching: false };
      const action = WeightStore.actions.fetchItems();

      // Act
      const result = WeightStore.reducers.weightReducer(state, action);

      // Assert
      expect(result.isFetching).toBeTrue();
    });

    it('should set error to null', () => {
      // Arrange
      const state: WeightState = {
        ...initialState,
        error: new Error('some error')
      };
      const action = WeightStore.actions.fetchItems();

      // Act
      const result = WeightStore.reducers.weightReducer(state, action);

      // Assert
      expect(result.error).toBeNull();
    });
  });

  describe('API_FETCH_weight', () => {
    const items: WeightTransaction[] = [
      { id: 1, animalId: 1, transactionDate: new Date(), weight: 77 },
      { id: 2, animalId: 1, transactionDate: new Date(), weight: 80 },
      { id: 3, animalId: 1, transactionDate: new Date(), weight: 83 },
      { id: 4, animalId: 1, transactionDate: new Date(), weight: 85 },
      { id: 5, animalId: 1, transactionDate: new Date(), weight: 88 }
    ];
    const pagedData: PagedData<WeightTransaction> = {
      currentPage: 0,
      data: [...items],
      pageCount: 1,
      pageSize: 10,
      totalRecordCount: 5
    };

    it('should add a weight transactions to the store if they do not exist', () => {
      // Arrange
      const state: WeightState = { ...initialState };
      const action = WeightStore.actions.apiFetchItems(pagedData);

      // Act
      const result = WeightStore.reducers.weightReducer(state, action);

      // Assert
      expect(result.ids.length).toBe(pagedData.data.length);
      pagedData.data.forEach((item: WeightTransaction) => {
        expect(result.entities[item.id]).not.toBeNull();
        expect(result.entities[item.id].id).toEqual(item.id);
        expect(result.entities[item.id].animalId).toEqual(item.animalId);
        expect(result.entities[item.id].transactionDate).toEqual(
          item.transactionDate
        );
        expect(result.entities[item.id].weight).toEqual(item.weight);
      });
    });

    it('should set the weight transaction in the store if it already exists', () => {
      // Arrange
      const ids: number[] = [];
      const entities: Dictionary<WeightTransaction> = {};
      pagedData.data.forEach((item: WeightTransaction) => {
        ids.push(item.id);
        entities[item.id] = { ...item, weight: 12 };
      });
      const state: WeightState = {
        ...initialState,
        ids,
        entities
      };

      const action = WeightStore.actions.apiFetchItems(pagedData);

      // Act
      const result = WeightStore.reducers.weightReducer(state, action);

      // Assert
      expect(result.ids.length).toBe(pagedData.data.length);
      pagedData.data.forEach((item: WeightTransaction) => {
        expect(result.entities[item.id]).not.toBeNull();
        expect(result.entities[item.id].id).toEqual(item.id);
        expect(result.entities[item.id].animalId).toEqual(item.animalId);
        expect(result.entities[item.id].transactionDate).toEqual(
          item.transactionDate
        );
        expect(result.entities[item.id].weight).toEqual(item.weight);
      });
    });

    it('should set isPending to false', () => {
      // Arrange
      const state: WeightState = { ...initialState, isPending: true };
      const action = WeightStore.actions.apiFetchItems(pagedData);

      // Act
      const result = WeightStore.reducers.weightReducer(state, action);

      // Assert
      expect(result.isPending).toBeFalse();
    });

    it('should set isFetching to false', () => {
      // Arrange
      const state: WeightState = { ...initialState, isFetching: true };
      const action = WeightStore.actions.apiFetchItems(pagedData);

      // Act
      const result = WeightStore.reducers.weightReducer(state, action);

      // Assert
      expect(result.isFetching).toBeFalse();
    });

    it('should set error to null', () => {
      // Arrange
      const state: WeightState = {
        ...initialState,
        error: new Error('some error')
      };
      const action = WeightStore.actions.apiFetchItems(pagedData);

      // Act
      const result = WeightStore.reducers.weightReducer(state, action);

      // Assert
      expect(result.error).toBeNull();
    });

    it('should set pageNumber to the currentPage value of the paged data', () => {
      // Arrange
      const state: WeightState = {
        ...initialState,
        pageNumber: 11
      };
      const action = WeightStore.actions.apiFetchItems(pagedData);

      // Act
      const result = WeightStore.reducers.weightReducer(state, action);

      // Assert
      expect(result.pageNumber).toEqual(pagedData.currentPage);
    });

    it('should set pageSize to the pageSize value of the paged data', () => {
      // Arrange
      const state: WeightState = {
        ...initialState,
        pageSize: 23
      };
      const action = WeightStore.actions.apiFetchItems(pagedData);

      // Act
      const result = WeightStore.reducers.weightReducer(state, action);

      // Assert
      expect(result.pageSize).toEqual(pagedData.pageSize);
    });

    it('should set recordCount to the totalRecordCount value of the paged data', () => {
      // Arrange
      const state: WeightState = {
        ...initialState,
        recordCount: 23
      };
      const action = WeightStore.actions.apiFetchItems(pagedData);

      // Act
      const result = WeightStore.reducers.weightReducer(state, action);

      // Assert
      expect(result.recordCount).toEqual(pagedData.totalRecordCount);
    });
  });

  describe('FETCH_SINGLE_weight', () => {
    it('should set isPending to true', () => {
      // Arrange
      const state: WeightState = { ...initialState, isPending: false };
      const action = WeightStore.actions.fetchSingle({ id: 1, animalId: 1 });

      // Act
      const result = WeightStore.reducers.weightReducer(state, action);

      // Assert
      expect(result.isPending).toBeTrue();
    });

    it('should set isFetching to true', () => {
      // Arrange
      const state: WeightState = { ...initialState, isFetching: false };
      const action = WeightStore.actions.fetchSingle({ id: 1, animalId: 1 });

      // Act
      const result = WeightStore.reducers.weightReducer(state, action);

      // Assert
      expect(result.isFetching).toBeTrue();
    });

    it('should set error to null', () => {
      // Arrange
      const state: WeightState = {
        ...initialState,
        error: new Error('some error')
      };
      const action = WeightStore.actions.fetchSingle({ id: 1, animalId: 1 });

      // Act
      const result = WeightStore.reducers.weightReducer(state, action);

      // Assert
      expect(result.error).toBeNull();
    });
  });

  describe('API_FETCH_SINGLE_weight', () => {
    const item: WeightTransaction = {
      id: 1,
      animalId: 1,
      transactionDate: new Date(),
      weight: 88
    };

    it('should add a weight transaction to the store if it does not exist', () => {
      // Arrange
      const state: WeightState = { ...initialState };
      const action = WeightStore.actions.apiFetchSingle(item);

      // Act
      const result = WeightStore.reducers.weightReducer(state, action);

      // Assert
      expect(result.ids.length).toBe(1);
      expect(result.entities[1]).not.toBeNull();
      expect(result.entities[1].id).toEqual(item.id);
      expect(result.entities[1].animalId).toEqual(item.animalId);
      expect(result.entities[1].transactionDate).toEqual(item.transactionDate);
      expect(result.entities[1].weight).toEqual(item.weight);
    });

    it('should set the weight transaction in the store if it already exists', () => {
      // Arrange
      const state: WeightState = {
        ...initialState,
        ids: [item.id],
        entities: {
          [item.id]: { ...item, weight: 44 }
        }
      };
      const action = WeightStore.actions.apiFetchSingle(item);

      // Act
      const result = WeightStore.reducers.weightReducer(state, action);

      // Assert
      expect(result.ids.length).toBe(1);
      expect(result.entities[1]).not.toBeNull();
      expect(result.entities[1].id).toEqual(item.id);
      expect(result.entities[1].animalId).toEqual(item.animalId);
      expect(result.entities[1].transactionDate).toEqual(item.transactionDate);
      expect(result.entities[1].weight).toEqual(item.weight);
    });

    it('should set isPending to false', () => {
      // Arrange
      const state: WeightState = { ...initialState, isPending: false };
      const action = WeightStore.actions.apiFetchSingle(item);

      // Act
      const result = WeightStore.reducers.weightReducer(state, action);

      // Assert
      expect(result.isPending).toBeFalse();
    });

    it('should set isFetching to false', () => {
      // Arrange
      const state: WeightState = { ...initialState, isFetching: true };
      const action = WeightStore.actions.apiFetchSingle(item);

      // Act
      const result = WeightStore.reducers.weightReducer(state, action);

      // Assert
      expect(result.isFetching).toBeFalse();
    });

    it('should set error to null', () => {
      // Arrange
      const state: WeightState = {
        ...initialState,
        error: new Error('some error')
      };
      const action = WeightStore.actions.apiFetchSingle(item);

      // Act
      const result = WeightStore.reducers.weightReducer(state, action);

      // Assert
      expect(result.error).toBeNull();
    });

    it('should set selectedId to the id of the fetched item', () => {
      // Arrange
      const state: WeightState = { ...initialState };
      const action = WeightStore.actions.apiFetchSingle(item);

      // Act
      const result = WeightStore.reducers.weightReducer(state, action);

      // Assert
      expect(result.selectedId).toEqual(item.id);
    });
  });

  describe('FETCH_ANIMAL_TRANSACTIONS_weight', () => {
    it('should set isFetching to true', () => {
      // Arrange
      const state: WeightState = { ...initialState, isFetching: false };
      const action = WeightStore.actions.fetchAnimalTransactions(1, 10);

      // Act
      const result = WeightStore.reducers.weightReducer(state, action);

      // Assert
      expect(result.isFetching).toBeTrue();
    });

    it('should set error to null', () => {
      // Arrange
      const state: WeightState = {
        ...initialState,
        error: new Error('some error')
      };
      const action = WeightStore.actions.fetchAnimalTransactions(1, 10);

      // Act
      const result = WeightStore.reducers.weightReducer(state, action);

      // Assert
      expect(result.error).toBeNull();
    });
  });

  describe('API_FETCH_ANIMAL_TRANSACTIONS_weight', () => {
    const animalId = 1;
    const items: WeightTransaction[] = [
      { id: 1, animalId, transactionDate: new Date(), weight: 77 },
      { id: 2, animalId, transactionDate: new Date(), weight: 80 },
      { id: 3, animalId, transactionDate: new Date(), weight: 83 },
      { id: 4, animalId, transactionDate: new Date(), weight: 85 },
      { id: 5, animalId, transactionDate: new Date(), weight: 88 }
    ];
    const pagedData: PagedData<WeightTransaction> = {
      currentPage: 0,
      data: [...items],
      pageCount: 1,
      pageSize: 10,
      totalRecordCount: 5
    };

    it('should add a weight transactions to the store if they do not exist', () => {
      // Arrange
      const state: WeightState = { ...initialState };
      const action = WeightStore.actions.apiFetchAnimalTransactions(
        animalId,
        pagedData
      );

      // Act
      const result = WeightStore.reducers.weightReducer(state, action);

      // Assert
      expect(result.ids.length).toBe(pagedData.data.length);
      pagedData.data.forEach((item: WeightTransaction) => {
        expect(result.entities[item.id]).not.toBeNull();
        expect(result.entities[item.id].id).toEqual(item.id);
        expect(result.entities[item.id].animalId).toEqual(item.animalId);
        expect(result.entities[item.id].transactionDate).toEqual(
          item.transactionDate
        );
        expect(result.entities[item.id].weight).toEqual(item.weight);
      });
    });

    it('should set the weight transaction in the store if it already exists', () => {
      // Arrange
      const ids: number[] = [];
      const entities: Dictionary<WeightTransaction> = {};
      pagedData.data.forEach((item: WeightTransaction) => {
        ids.push(item.id);
        entities[item.id] = { ...item, weight: 12 };
      });
      const state: WeightState = {
        ...initialState,
        ids,
        entities
      };

      const action = WeightStore.actions.apiFetchAnimalTransactions(
        animalId,
        pagedData
      );

      // Act
      const result = WeightStore.reducers.weightReducer(state, action);

      // Assert
      expect(result.ids.length).toBe(pagedData.data.length);
      pagedData.data.forEach((item: WeightTransaction) => {
        expect(result.entities[item.id]).not.toBeNull();
        expect(result.entities[item.id].id).toEqual(item.id);
        expect(result.entities[item.id].animalId).toEqual(item.animalId);
        expect(result.entities[item.id].transactionDate).toEqual(
          item.transactionDate
        );
        expect(result.entities[item.id].weight).toEqual(item.weight);
      });
    });

    it('should set isFetching to false', () => {
      // Arrange
      const state: WeightState = { ...initialState, isFetching: true };
      const action = WeightStore.actions.apiFetchAnimalTransactions(
        animalId,
        pagedData
      );

      // Act
      const result = WeightStore.reducers.weightReducer(state, action);

      // Assert
      expect(result.isFetching).toBeFalse();
    });

    it('should set error to null', () => {
      // Arrange
      const state: WeightState = {
        ...initialState,
        error: new Error('some error')
      };
      const action = WeightStore.actions.apiFetchAnimalTransactions(
        animalId,
        pagedData
      );

      // Act
      const result = WeightStore.reducers.weightReducer(state, action);

      // Assert
      expect(result.error).toBeNull();
    });

    it('should set pageNumber to the currentPage value of the paged data', () => {
      // Arrange
      const state: WeightState = {
        ...initialState,
        pageNumber: 11
      };
      const action = WeightStore.actions.apiFetchAnimalTransactions(
        animalId,
        pagedData
      );

      // Act
      const result = WeightStore.reducers.weightReducer(state, action);

      // Assert
      expect(result.pageNumber).toEqual(pagedData.currentPage);
    });

    it('should set pageSize to the pageSize value of the paged data', () => {
      // Arrange
      const state: WeightState = {
        ...initialState,
        pageSize: 23
      };
      const action = WeightStore.actions.apiFetchAnimalTransactions(
        animalId,
        pagedData
      );

      // Act
      const result = WeightStore.reducers.weightReducer(state, action);

      // Assert
      expect(result.pageSize).toEqual(pagedData.pageSize);
    });

    it('should set recordCount to the totalRecordCount value of the paged data', () => {
      // Arrange
      const state: WeightState = {
        ...initialState,
        recordCount: 23
      };
      const action = WeightStore.actions.apiFetchAnimalTransactions(
        animalId,
        pagedData
      );

      // Act
      const result = WeightStore.reducers.weightReducer(state, action);

      // Assert
      expect(result.recordCount).toEqual(pagedData.totalRecordCount);
    });
  });

  describe('RESET_SAVE_STATE_weight', () => {
    it('should set saveState to New', () => {
      // Arrange
      const state: WeightState = { ...initialState };
      const action = WeightStore.actions.resetSaveState();

      // Act
      const result = WeightStore.reducers.weightReducer(state, action);

      // Assert
      expect(result.saveState).toBe(SaveState.New);
    });
  });

  describe('UPDATE_weight', () => {
    const item: WeightTransaction = {
      animalId: 1,
      id: 1,
      transactionDate: new Date(),
      weight: 88
    };

    it('should set saveState to Saving', () => {
      // Arrange
      const state: WeightState = { ...initialState };
      const action = WeightStore.actions.updateItem(item, 1);

      // Act
      const result = WeightStore.reducers.weightReducer(state, action);

      // Assert
      expect(result.saveState).toEqual(SaveState.Saving);
    });

    it('should set isPending to true', () => {
      // Arrange
      const state: WeightState = { ...initialState, isPending: false };
      const action = WeightStore.actions.updateItem(item, 1);

      // Act
      const result = WeightStore.reducers.weightReducer(state, action);

      // Assert
      expect(result.isPending).toBeTrue();
    });

    it('should set error to null', () => {
      // Arrange
      const state: WeightState = {
        ...initialState,
        error: new Error('some error')
      };
      const action = WeightStore.actions.updateItem(item, 1);

      // Act
      const result = WeightStore.reducers.weightReducer(state, action);

      // Assert
      expect(result.error).toBeNull();
    });
  });

  describe('API_UPDATE_weight', () => {
    const item: WeightTransaction = {
      animalId: 1,
      id: 1,
      transactionDate: new Date(),
      weight: 88
    };

    const update: Update<WeightTransaction> = {
      changes: item,
      id: 1
    };

    it('should set saveState to Success', () => {
      // Arrange
      const state: WeightState = { ...initialState };
      const action = WeightStore.actions.apiUpdateItem(update, 1);

      // Act
      const result = WeightStore.reducers.weightReducer(state, action);

      // Assert
      expect(result.saveState).toEqual(SaveState.Success);
    });

    it('should set isPending to false', () => {
      // Arrange
      const state: WeightState = { ...initialState, isPending: false };
      const action = WeightStore.actions.apiUpdateItem(update, 1);

      // Act
      const result = WeightStore.reducers.weightReducer(state, action);

      // Assert
      expect(result.isPending).toBeFalse();
    });

    it('should set error to null', () => {
      // Arrange
      const state: WeightState = {
        ...initialState,
        error: new Error('some error')
      };
      const action = WeightStore.actions.apiUpdateItem(update, 1);

      // Act
      const result = WeightStore.reducers.weightReducer(state, action);

      // Assert
      expect(result.error).toBeNull();
    });

    it('should set selectedId to the id of the updated item', () => {
      // Arrange
      const state: WeightState = { ...initialState };
      const action = WeightStore.actions.apiUpdateItem(update, 1);

      // Act
      const result = WeightStore.reducers.weightReducer(state, action);

      // Assert
      expect(result.selectedId).toEqual(item.id);
    });

    it('should set the weight transaction in the store if it already exists', () => {
      // Arrange
      const state: WeightState = {
        ...initialState,
        ids: [item.id],
        entities: {
          [item.id]: { ...item, weight: 44 }
        }
      };
      const action = WeightStore.actions.apiUpdateItem(update, 1);

      // Act
      const result = WeightStore.reducers.weightReducer(state, action);

      // Assert
      expect(result.ids.length).toBe(1);
      expect(result.entities[1]).not.toBeNull();
      expect(result.entities[1].id).toEqual(item.id);
      expect(result.entities[1].animalId).toEqual(item.animalId);
      expect(result.entities[1].transactionDate).toEqual(item.transactionDate);
      expect(result.entities[1].weight).toEqual(item.weight);
    });
  });
});
