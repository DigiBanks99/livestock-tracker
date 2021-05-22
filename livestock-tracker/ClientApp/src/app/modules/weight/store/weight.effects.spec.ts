import { Observable, of } from 'rxjs';
import { RunHelpers } from 'rxjs/internal/testing/TestScheduler';
import { TestScheduler } from 'rxjs/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AnimalState } from '@core/store';
import { getSelectedAnimalId } from '@core/store/selectors';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { WeightTransaction } from '@weight/interfaces';
import { WeightService } from '@weight/services/weight.service';
import { WeightStore } from '@weight/store';
import { WeightEffects } from '@weight/store/weight.effects';

describe('WeightEffects', () => {
  let service: WeightService;
  let effects: WeightEffects;
  let actions$: Observable<Action>;
  let testScheduler: TestScheduler;
  let serviceSpy: jasmine.SpyObj<WeightService>;

  beforeEach(() => {
    serviceSpy = jasmine.createSpyObj<WeightService>(WeightService.name, [
      'add',
      'delete',
      'get',
      'getAll',
      'getAnimalTransactions',
      'update'
    ]);

    TestBed.configureTestingModule({
      providers: [
        { provide: WeightService, useValue: serviceSpy },
        WeightEffects,
        provideMockActions(() => actions$),
        provideMockStore<AnimalState>({
          selectors: [{ selector: getSelectedAnimalId, value: 1 }]
        })
      ],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        NoopAnimationsModule
      ]
    });

    service = TestBed.inject(WeightService);
    effects = TestBed.inject(WeightEffects);
    actions$ = TestBed.inject(Actions);

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should create', () => {
    expect(effects).toBeTruthy();
  });

  describe('getAll$', () => {
    it('should return an apiFetchItems action when successful', () => {
      testScheduler.run(({ cold, expectObservable, flush }: RunHelpers) => {
        const items: WeightTransaction[] = [
          { id: 1, animalId: 1, transactionDate: new Date(), weight: 77 },
          { id: 2, animalId: 1, transactionDate: new Date(), weight: 80 },
          { id: 3, animalId: 1, transactionDate: new Date(), weight: 83 },
          { id: 4, animalId: 1, transactionDate: new Date(), weight: 85 },
          { id: 5, animalId: 1, transactionDate: new Date(), weight: 88 }
        ];
        const completion = WeightStore.actions.apiFetchItems({
          data: items,
          currentPage: 1,
          pageCount: 1,
          totalRecordCount: items.length,
          pageSize: 10
        });

        actions$ = cold('a', { a: WeightStore.actions.fetchItems() });

        serviceSpy.getAll.and.returnValue(
          of({
            data: items,
            currentPage: 1,
            pageCount: 1,
            totalRecordCount: items.length,
            pageSize: 10
          })
        );

        expectObservable(effects.getAll$).toBe('a', { a: completion });

        flush();

        expect(serviceSpy.getAll).toHaveBeenCalledTimes(1);
      });
    });

    it('should return an apiError action when the http service fails', () => {
      testScheduler.run(({ cold, expectObservable, flush }: RunHelpers) => {
        const error = new Error('Network connection error');
        const completion = WeightStore.actions.apiError(error);
        const switchMapMarble = '(a|)';

        actions$ = cold('a', { a: WeightStore.actions.fetchItems() });

        serviceSpy.getAll.and.throwError(error.message);

        expectObservable(effects.getAll$).toBe(switchMapMarble, {
          a: completion
        });

        flush();

        expect(serviceSpy.getAll).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('getAllAnimalTransactions$', () => {
    const items: WeightTransaction[] = [
      { id: 1, animalId: 1, transactionDate: new Date(), weight: 77 },
      { id: 2, animalId: 1, transactionDate: new Date(), weight: 80 },
      { id: 3, animalId: 1, transactionDate: new Date(), weight: 83 },
      { id: 4, animalId: 1, transactionDate: new Date(), weight: 85 },
      { id: 5, animalId: 1, transactionDate: new Date(), weight: 88 }
    ];

    it('should return an apiFetchAnimalTransactions action when successful', () => {
      testScheduler.run(({ cold, expectObservable, flush }: RunHelpers) => {
        const completion = WeightStore.actions.apiFetchAnimalTransactions(1, {
          data: items,
          currentPage: 1,
          pageCount: 1,
          totalRecordCount: items.length,
          pageSize: 10
        });
        actions$ = cold('a', {
          a: WeightStore.actions.fetchAnimalTransactions(5, 10)
        });

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
        const completion = WeightStore.actions.apiError(error);
        const switchMapMarble = '(a|)';

        actions$ = cold('a', {
          a: WeightStore.actions.fetchAnimalTransactions(5, 10)
        });

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

  describe('add$', () => {
    let item: WeightTransaction;

    beforeEach(() => {
      item = {
        animalId: 1,
        id: 1,
        transactionDate: new Date(),
        weight: 88
      };
    });

    it('should return an apiAddItem action when successful', () => {
      testScheduler.run(({ cold, expectObservable, flush }: RunHelpers) => {
        const completion = WeightStore.actions.apiAddItem(item);

        actions$ = cold('a', { a: WeightStore.actions.addItem(item) });

        serviceSpy.add.and.returnValue(of({ ...item }));

        expectObservable(effects.add$).toBe('a', {
          a: completion
        });

        flush();

        expect(serviceSpy.add).toHaveBeenCalledTimes(1);
      });
    });

    it('should return an apiError action when the http service fails', () => {
      testScheduler.run(({ cold, expectObservable, flush }: RunHelpers) => {
        const error = new Error('Network connection error');
        const completion = WeightStore.actions.apiError(error);
        const switchMapMarble = '(a|)';

        actions$ = cold('a', { a: WeightStore.actions.addItem(item) });

        serviceSpy.add.and.throwError(error.message);

        expectObservable(effects.add$).toBe(switchMapMarble, {
          a: completion
        });

        flush();

        expect(serviceSpy.add).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('update$', () => {
    const item: WeightTransaction = {
      animalId: 1,
      id: 1,
      transactionDate: new Date(),
      weight: 88
    };
    const marbleValue = { a: WeightStore.actions.updateItem(item, item.id) };

    it('should return an apiUpdateItem action when successful', () => {
      testScheduler.run(({ cold, expectObservable, flush }: RunHelpers) => {
        const updateItem: Update<WeightTransaction> = {
          changes: item,
          id: item.id.toString()
        };
        const completion = WeightStore.actions.apiUpdateItem(
          updateItem,
          item.id
        );

        actions$ = cold('a', marbleValue);

        serviceSpy.update.and.returnValue(of(item));

        expectObservable(effects.update$).toBe('a', {
          a: completion
        });

        flush();

        expect(serviceSpy.update).toHaveBeenCalledTimes(1);
      });
    });

    it('should return an apiError action when the http service fails', () => {
      testScheduler.run(({ cold, expectObservable, flush }: RunHelpers) => {
        const error = new Error('Network connection error');
        const completion = WeightStore.actions.apiError(error);
        const switchMapMarble = '(a|)';

        actions$ = cold('a', marbleValue);

        serviceSpy.update.and.throwError(error.message);

        expectObservable(effects.update$).toBe(switchMapMarble, {
          a: completion
        });

        flush();

        expect(serviceSpy.update).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('remove$', () => {
    const key = 99;
    const marbleValue = { a: WeightStore.actions.deleteItem(key) };

    it('should return an apiDeleteItem action when successful', () => {
      testScheduler.run(({ cold, expectObservable, flush }: RunHelpers) => {
        const completion = WeightStore.actions.apiDeleteItem(key);

        actions$ = cold('a', marbleValue);

        serviceSpy.delete.and.returnValue(of(key));

        expectObservable(effects.remove$).toBe('a', {
          a: completion
        });

        flush();

        expect(serviceSpy.delete).toHaveBeenCalledTimes(1);
      });
    });

    it('should return an apiError action when the http service fails', () => {
      testScheduler.run(({ cold, expectObservable, flush }: RunHelpers) => {
        const error = new Error('Network connection error');
        const completion = WeightStore.actions.apiError(error);
        const switchMapMarble = '(a|)';

        actions$ = cold('a', marbleValue);

        serviceSpy.delete.and.throwError(error.message);

        expectObservable(effects.remove$).toBe(switchMapMarble, {
          a: completion
        });

        flush();

        expect(serviceSpy.delete).toHaveBeenCalledTimes(1);
      });
    });
  });
});
