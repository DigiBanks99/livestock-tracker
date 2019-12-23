import { Observable, of } from 'rxjs';
import { RunHelpers } from 'rxjs/internal/testing/TestScheduler';
import { TestScheduler } from 'rxjs/testing';

import { Injectable } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { CrudService } from '@core/models/crud-service.interface';
import { KeyEntity } from '@core/models/key-entity.interface';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';

import { crudActionsFactory, PayloadAction } from './crud.actions';
import { CrudEffects } from './crud.effects';

const testActions = crudActionsFactory<TestEntity, number>('TEST');

class TestEntity implements KeyEntity<number> {
  id: number;
}

@Injectable()
class TestService implements CrudService<TestEntity, number> {
  getAll(): Observable<TestEntity[]> {
    throw new Error('Method not implemented.');
  }
  get(key: number): Observable<TestEntity> {
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
class TestEffects extends CrudEffects<TestEntity, number> {
  constructor(protected actions$: Actions, service: TestService) {
    super(actions$, service, testActions, 'TEST');
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
  let testScheduler = new TestScheduler((actual, expected) => {
    expect(actual).toBe(expected);
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [TestService, TestEffects, provideMockActions(actions$)]
    });

    service = TestBed.get(TestService);
    getAllSpy = spyOn(service, 'getAll');
    getSpy = spyOn(service, 'get');
    addSpy = spyOn(service, 'add');
    updateSpy = spyOn(service, 'update');
    deleteSpy = spyOn(service, 'delete');

    effects = TestBed.get(TestEffects);
    actions$ = TestBed.get(Actions);
  }));

  it('should create', () => {
    expect(effects).toBeTruthy();
  });

  describe('getAll$', () => {
    it('should call getAll on service', () => {
      effects.getAll$.subscribe();
      getAllSpy.and.callThrough();
      expect(getAllSpy).toHaveBeenCalledTimes(1);
    });

    it('should return an apiFetchItems action when successful', () => {
      const items: TestEntity[] = [
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
        { id: 5 }
      ];
      const action = testActions.fetchItems();
      const completion = testActions.apiFetchItems(items);

      testScheduler.run((helpers: RunHelpers) => {
        const {hot, cold, expectObservable} = helpers;
      actions$ = hot('-a', { a: action });
      const response = cold('-a|', { a: items });
      const expected = '--c';

      getAllSpy.and.returnValue(response);

      expectObservable(effects.getAll$).toBe(expected);
      });
    });
  });
});
