import { Observable, of } from 'rxjs';
import { RunHelpers } from 'rxjs/internal/testing/TestScheduler';
import { TestScheduler } from 'rxjs/testing';

import { Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AnimalTransaction, PagedData } from '@core/models';
import { AnimalTransactionService } from '@core/models/services';
import { AnimalState } from '@core/store';
import { getSelectedAnimalId } from '@core/store/selectors';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, Store } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';

import { fetchAnimalTransactionsActionFactory } from './fetch-animal-transaction.actions';
import { FetchAnimalTransactionEffects } from './fetch-animal-transaction.effects';

describe('FetchAnimalTransactionEffects', () => {
  interface TestEntity extends AnimalTransaction {}

  const testActions = fetchAnimalTransactionsActionFactory<TestEntity>('TEST');

  class TestService implements AnimalTransactionService<TestEntity> {
    getAll(): Observable<PagedData<TestEntity>> {
      throw new Error('Method not implemented.');
    }
    get(key: TestEntity): Observable<TestEntity> {
      throw new Error('Method not implemented.');
    }
    getAnimalTransactions(
      animalId: number,
      paginationParameters: PageEvent
    ): Observable<PagedData<TestEntity>> {
      throw new Error('Method not implemented');
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
  class TestEffects extends FetchAnimalTransactionEffects<TestEntity> {
    constructor(
      protected actions$: Actions,
      mockAnimalStore: Store<AnimalState>,
      service: TestService,
      snackBar: MatSnackBar
    ) {
      super(actions$, mockAnimalStore, service, testActions, 'TEST', snackBar);
    }
  }

  let testScheduler: TestScheduler;
  let service: TestService;
  let effects: TestEffects;
  let actions$: Observable<Action>;
  let serviceSpy: jasmine.SpyObj<TestService>;

  beforeEach(async () => {
    serviceSpy = jasmine.createSpyObj<TestService>(TestService.name, [
      'getAnimalTransactions'
    ]);

    await TestBed.configureTestingModule({
      providers: [
        TestService,
        TestEffects,
        { provide: TestService, useValue: serviceSpy },
        provideMockActions(() => actions$),
        provideMockStore<AnimalState>({
          selectors: [{ selector: getSelectedAnimalId, value: 1 }]
        })
      ],
      imports: [MatSnackBarModule, NoopAnimationsModule]
    }).compileComponents();

    service = TestBed.inject(TestService);
    effects = TestBed.inject(TestEffects);
    actions$ = TestBed.inject(Actions);

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should create', () => {
    expect(effects).toBeTruthy();
  });

  describe('getAllAnimalTransactions$', () => {
    const items: TestEntity[] = [
      { id: 1, animalId: 1, transactionDate: new Date() },
      { id: 2, animalId: 1, transactionDate: new Date() },
      { id: 3, animalId: 1, transactionDate: new Date() },
      { id: 4, animalId: 1, transactionDate: new Date() },
      { id: 5, animalId: 1, transactionDate: new Date() }
    ];

    it('should return an apiFetchAnimalTransactions action when successful', () => {
      testScheduler.run(({ cold, expectObservable, flush }: RunHelpers) => {
        const completion = testActions.apiFetchAnimalTransactions(1, {
          data: items,
          currentPage: 1,
          pageCount: 1,
          totalRecordCount: items.length,
          pageSize: 10
        });
        actions$ = cold('a', { a: testActions.fetchAnimalTransactions(5, 10) });

        serviceSpy.getAnimalTransactions.and.returnValue(
          of({
            data: items,
            currentPage: 1,
            pageCount: 1,
            totalRecordCount: items.length,
            pageSize: 10
          })
        );

        expectObservable(effects.getAllAnimalTransactions$).toBe('a', {
          a: completion
        });

        flush();

        expect(serviceSpy.getAnimalTransactions).toHaveBeenCalledTimes(1);
        expect(serviceSpy.getAnimalTransactions).toHaveBeenCalledWith(1, <
          PageEvent
        >{ length: 0, pageSize: 10, pageIndex: 5 });
      });
    });

    it('should return an apiError action when the http service fails', () => {
      testScheduler.run(({ cold, expectObservable, flush }: RunHelpers) => {
        const error = new Error('Network connection error');
        const completion = testActions.apiError(error);
        const switchMapMarble = '(a|)';

        actions$ = cold('a', { a: testActions.fetchAnimalTransactions(5, 10) });

        serviceSpy.getAnimalTransactions.and.throwError(error.message);

        expectObservable(effects.getAllAnimalTransactions$).toBe(
          switchMapMarble,
          {
            a: completion
          }
        );

        flush();

        expect(serviceSpy.getAnimalTransactions).toHaveBeenCalledTimes(1);
      });
    });
  });
});
