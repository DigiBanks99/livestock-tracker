import { Observable, of } from 'rxjs';
import { RunHelpers } from 'rxjs/internal/testing/TestScheduler';
import { TestScheduler } from 'rxjs/testing';

import { Injectable } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { CrudService } from '@core/models/crud-service.interface';
import { KeyEntity } from '@core/models/key-entity.interface';
import { PagedData } from '@core/models/paged-data.model';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';

import { crudActionsFactory } from './crud.actions';
import { CrudEffects } from './crud.effects';

interface TestEntity extends KeyEntity<number> {}

const testActions = crudActionsFactory<TestEntity, number>('TEST');

@Injectable()
class TestService implements CrudService<TestEntity, number, TestEntity> {
  getAll(): Observable<PagedData<TestEntity>> {
    throw new Error('Method not implemented.');
  }
  get(key: TestEntity): Observable<TestEntity> {
    throw new Error('Method not implemented.');
  }
  add(item: TestEntity): Observable<TestEntity> {
    throw new Error('Method not implemented.');
  }
  update(item: TestEntity, key: number): Observable<TestEntity> {
    throw new Error('Method not implemented.');
  }
  delete(key: number): Observable<number> {
    throw new Error('Method not implemented.');
  }
}

@Injectable()
class TestEffects extends CrudEffects<TestEntity, number, TestEntity> {
  constructor(protected actions$: Actions, service: TestService) {
    super(actions$, service, testActions, 'TEST', null);
  }
}

describe('Crud Effects', () => {
  let getAllSpy: jasmine.Spy;
  let getSpy: jasmine.Spy;
  let addSpy: jasmine.Spy;
  let updateSpy: jasmine.Spy;
  let deleteSpy: jasmine.Spy;
  let service: TestService;
  let effects: TestEffects;
  let actions$: Observable<Action>;
  let testScheduler: TestScheduler;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [TestService, TestEffects, provideMockActions(() => actions$)],
    });

    service = TestBed.get(TestService);
    getAllSpy = spyOn(service, 'getAll');
    getSpy = spyOn(service, 'get');
    addSpy = spyOn(service, 'add');
    updateSpy = spyOn(service, 'update');
    deleteSpy = spyOn(service, 'delete');

    effects = TestBed.get(TestEffects);
    actions$ = TestBed.get(Actions);

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  }));

  it('should create', () => {
    expect(effects).toBeTruthy();
  });

  describe('getAll$', () => {
    it('should return an apiFetchItems action when successful', () => {
      testScheduler.run(({ expectObservable, flush }: RunHelpers) => {
        const items: TestEntity[] = [
          { id: 1 },
          { id: 2 },
          { id: 3 },
          { id: 4 },
          { id: 5 },
        ];
        const completion = testActions.apiFetchItems(items);

        getAllSpy.and.returnValue(of(items));

        expectObservable(effects.getAll$).toBe('a', { a: completion });

        flush();

        expect(getAllSpy).toHaveBeenCalledTimes(1);
      });
    });

    it('should return an apiError action when the http service fails', () => {
      testScheduler.run(({ expectObservable, flush }: RunHelpers) => {
        const error = new Error('Network connection error');
        const completion = testActions.apiError(error);
        const switchMapMarble = '(a|)';

        getAllSpy.and.throwError(error.message);

        expectObservable(effects.getAll$).toBe(switchMapMarble, {
          a: completion,
        });

        flush();

        expect(getAllSpy).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('add$', () => {
    let item: TestEntity;

    beforeEach(() => {
      item = { id: 99 };
    });

    it('should return an apiAddItem action when successful', () => {
      testScheduler.run(({ cold, expectObservable, flush }: RunHelpers) => {
        const completion = testActions.apiAddItem(item);

        actions$ = cold('a', { a: testActions.addItem(item) });

        addSpy.and.returnValue(of({ ...item }));

        expectObservable(effects.add$).toBe('a', {
          a: completion,
        });

        flush();

        expect(addSpy).toHaveBeenCalledTimes(1);
      });
    });

    it('should return an apiError action when the http service fails', () => {
      testScheduler.run(({ cold, expectObservable, flush }: RunHelpers) => {
        const error = new Error('Network connection error');
        const completion = testActions.apiError(error);
        const switchMapMarble = '(a|)';

        actions$ = cold('a', { a: testActions.addItem(item) });

        addSpy.and.throwError(error.message);

        expectObservable(effects.add$).toBe(switchMapMarble, {
          a: completion,
        });

        flush();

        expect(addSpy).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('update$', () => {
    const item = { id: 99 };
    const marbleValue = { a: testActions.updateItem(item, item.id) };

    it('should return an apiUpdateItem action when successful', () => {
      testScheduler.run(({ cold, expectObservable, flush }: RunHelpers) => {
        const updateItem: Update<TestEntity> = {
          changes: item,
          id: item.id.toString(),
        };
        const completion = testActions.apiUpdateItem(updateItem, item.id);

        actions$ = cold('a', marbleValue);

        updateSpy.and.returnValue(of(item));

        expectObservable(effects.update$).toBe('a', {
          a: completion,
        });

        flush();

        expect(updateSpy).toHaveBeenCalledTimes(1);
      });
    });

    it('should return an apiError action when the http service fails', () => {
      testScheduler.run(({ cold, expectObservable, flush }: RunHelpers) => {
        const error = new Error('Network connection error');
        const completion = testActions.apiError(error);
        const switchMapMarble = '(a|)';

        actions$ = cold('a', marbleValue);

        updateSpy.and.throwError(error.message);

        expectObservable(effects.update$).toBe(switchMapMarble, {
          a: completion,
        });

        flush();

        expect(updateSpy).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('remove$', () => {
    const key = 99;
    const marbleValue = { a: testActions.deleteItem(key) };

    it('should return an apiDeleteItem action when successful', () => {
      testScheduler.run(({ cold, expectObservable, flush }: RunHelpers) => {
        const completion = testActions.apiDeleteItem(key);

        actions$ = cold('a', marbleValue);

        deleteSpy.and.returnValue(of(key));

        expectObservable(effects.remove$).toBe('a', {
          a: completion,
        });

        flush();

        expect(deleteSpy).toHaveBeenCalledTimes(1);
      });
    });

    it('should return an apiError action when the http service fails', () => {
      testScheduler.run(({ cold, expectObservable, flush }: RunHelpers) => {
        const error = new Error('Network connection error');
        const completion = testActions.apiError(error);
        const switchMapMarble = '(a|)';

        actions$ = cold('a', marbleValue);

        deleteSpy.and.throwError(error.message);

        expectObservable(effects.remove$).toBe(switchMapMarble, {
          a: completion,
        });

        flush();

        expect(deleteSpy).toHaveBeenCalledTimes(1);
      });
    });
  });
});
