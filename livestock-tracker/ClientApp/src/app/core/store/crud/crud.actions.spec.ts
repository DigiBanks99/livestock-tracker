import { Unit } from '@core/models';
import { Update } from '@ngrx/entity';

import { crudActionsFactory } from './crud.actions';

describe('Crud Actions', () => {
  const actions = crudActionsFactory<Unit, number>('TEST');

  describe('addItem', () => {
    let item: Unit;

    beforeEach(() => {
      item = {
        id: 1,
        description: 'Some description'
      };
    });

    it('should contain addItem as an action', () => {
      expect(actions.addItem.name).toBe('addItem');
    });

    it('should replace type name variable in type', () => {
      expect(actions.addItem(item).type).toBe('ADD_TEST');
    });

    it('should have a payload as the provided item', () => {
      const { payload } = actions.addItem(item);
      expect(payload).toBeDefined();
      expect(payload).not.toBeNull();
      expect(payload).toBe(item);
    });
  });

  describe('updateItem', () => {
    let item: Unit;

    beforeEach(() => {
      item = {
        id: 1,
        description: 'Some description'
      };
    });

    it('should contain updateItem as an action', () => {
      expect(actions.updateItem.name).toBe('updateItem');
    });

    it('should replace type name variable in type', () => {
      expect(actions.updateItem(item, item.id).type).toBe('UPDATE_TEST');
    });

    it('should contain a payload with the id and the item provided', () => {
      const { payload } = actions.updateItem(item, item.id);
      expect(payload).toBeDefined();
      expect(payload).not.toBeNull();
      expect(payload.key).toBe(item.id);
      expect(payload.value).toBe(item);
    });
  });

  describe('deleteItem', () => {
    let id: number;

    beforeEach(() => (id = 1));

    it('should contain deleteItem as an action', () => {
      expect(actions.deleteItem.name).toBe('deleteItem');
    });

    it('should replace type name variable in type', () => {
      expect(actions.deleteItem(id).type).toBe('DELETE_TEST');
    });

    it('should contain a payload as the provided value', () => {
      expect(actions.deleteItem(id).payload).toBe(id);
    });
  });

  describe('fetchItems', () => {
    it('should contain fetchItems as an action', () => {
      expect(actions.fetchItems.name).toBe('fetchItems');
    });

    it('should replace type name variable in type', () => {
      expect(actions.fetchItems().type).toBe('FETCH_TEST');
    });
  });

  describe('apiAddItem', () => {
    let item: Unit;

    beforeEach(
      () =>
        (item = {
          id: 1,
          description: 'Some description'
        })
    );

    it('should contain apiAddItem as an action', () => {
      expect(actions.apiAddItem.name).toBe('apiAddItem');
    });

    it('should replace type name variable in type', () => {
      expect(actions.apiAddItem(item).type).toBe('API_ADD_TEST');
    });

    it('should contain a payload as the provided item', () => {
      const { payload } = actions.apiAddItem(item);
      expect(payload).toBeDefined();
      expect(payload).not.toBeNull();
      expect(payload).toBe(item);
    });
  });

  describe('apiUpdateItem', () => {
    let id: number;
    let update: Update<Unit>;

    beforeEach(() => {
      id = 1;
      update = {
        changes: {
          description: 'Some description',
          id
        },
        id
      };
    });

    it('should contain apiUpdateItem as an action', () => {
      expect(actions.apiUpdateItem.name).toBe('apiUpdateItem');
    });

    it('should replace type name variable in type', () => {
      expect(actions.apiUpdateItem(update, id).type).toBe('API_UPDATE_TEST');
    });

    it('should contain a payload that contains the key and the changes for the item', () => {
      const { payload } = actions.apiUpdateItem(update, id);
      expect(payload).toBeDefined();
      expect(payload).not.toBeNull();
      expect(payload.key).toBe(id);
      expect(payload.value).toBe(update);
    });
  });

  describe('apiDeleteItem', () => {
    let id: number;

    beforeEach(() => (id = 1));

    it('should contain apiDeleteItem as an action', () => {
      expect(actions.apiDeleteItem.name).toBe('apiDeleteItem');
    });

    it('should replace type name variable in type for apiDeleteItem', () => {
      expect(actions.apiDeleteItem(id).type).toBe('API_DELETE_TEST');
    });

    it('should contain a payload that is the key provided', () => {
      expect(actions.apiDeleteItem(id).payload).toBe(id);
    });
  });

  describe('apiFetchItems', () => {
    let items: Unit[];

    beforeEach(() => {
      items = [
        { id: 1, description: 'One' },
        { id: 2, description: 'Two' },
        { id: 3, description: 'Three' },
        { id: 4, description: 'Four' },
        { id: 5, description: 'Five' },
        { id: 6, description: 'Six' }
      ];
    });

    it('should contain apiFetchItems as an action', () => {
      expect(actions.apiFetchItems.name).toBe('apiFetchItems');
    });

    it('should replace type name variable in type for apiFetchItems', () => {
      expect(
        actions.apiFetchItems({
          data: items,
          pageSize: items.length,
          currentPage: 0,
          pageCount: 1,
          totalRecordCount: items.length
        }).type
      ).toBe('API_FETCH_TEST');
    });

    it('should contain a payload that is the array provided', () => {
      const { payload } = actions.apiFetchItems({
        data: items,
        pageSize: items.length,
        currentPage: 0,
        pageCount: 1,
        totalRecordCount: items.length
      });
      expect(payload).toBeDefined();
      expect(payload).not.toBeNull();
      expect(payload.data.length).toBe(items.length);
      payload.data.forEach((item: Unit, index: number) => {
        expect(item).toBe(items[index]);
      });
    });
  });

  describe('apiError', () => {
    let error: Error;

    beforeEach(() => (error = new Error('Some error')));

    it('should contain apiError as an action', () => {
      expect(actions.apiError.name).toBe('apiError');
    });

    it('should replace type name variable in type for apiError', () => {
      expect(actions.apiError(error).type).toBe('API_ERROR_TEST');
    });

    it('should contain a payload that is the error provided', () => {
      const { payload } = actions.apiError(error);
      expect(payload).toBeDefined();
      expect(payload).not.toBeNull();
      expect(payload).toBe(error);
    });
  });
});
