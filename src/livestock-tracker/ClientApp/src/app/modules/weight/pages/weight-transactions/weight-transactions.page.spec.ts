import { RunHelpers } from 'rxjs/internal/testing/TestScheduler';
import { TestScheduler } from 'rxjs/testing';

import { LocationStrategy } from '@angular/common';
import { MockLocationStrategy } from '@angular/common/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { initialState } from '@animal/store/animal.reducers';
import { AnimalState, PaginationState } from '@core/store';
import { getSelectedAnimalId } from '@core/store/selectors';
import { environment } from '@env/environment';
import { DefaultProjectorFn, MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { WeightTransactionListStubComponent } from '@test/weight';
import { WeightState, WeightTransaction } from '@weight/interfaces';
import { WeightStore } from '@weight/store';

import { WeightTransactionsPage } from './weight-transactions.page';

describe('WeightTransactionPage', () => {
  let component: WeightTransactionsPage;
  let fixture: ComponentFixture<WeightTransactionsPage>;
  let store: MockStore<WeightState>;
  let dispatchSpy: jasmine.Spy;
  let routerSpy: jasmine.SpyObj<Router>;
  let mockGetSelectedAnimalIdSelector: MemoizedSelector<
    AnimalState,
    number,
    DefaultProjectorFn<number>
  >;
  let mockIsFetchingSelector: MemoizedSelector<
    WeightState,
    boolean,
    DefaultProjectorFn<boolean>
  >;
  let mockPaginationDataSelector: MemoizedSelector<
    WeightState,
    PaginationState,
    DefaultProjectorFn<PaginationState>
  >;
  let mockTransactionsSelector: MemoizedSelector<
    WeightState,
    WeightTransaction[],
    DefaultProjectorFn<WeightTransaction[]>
  >;
  let testScheduler: TestScheduler;
  const animalId = 1;
  let items: WeightTransaction[] = [
    { id: 1, animalId, transactionDate: new Date(), weight: 40 },
    { id: 2, animalId, transactionDate: new Date(), weight: 50 },
    { id: 3, animalId, transactionDate: new Date(), weight: 60 },
    { id: 4, animalId, transactionDate: new Date(), weight: 70 },
    { id: 5, animalId, transactionDate: new Date(), weight: 80 }
  ];

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj<Router>(Router.name, ['navigateByUrl']);
    await TestBed.configureTestingModule({
      declarations: [
        WeightTransactionsPage,
        WeightTransactionListStubComponent
      ],
      imports: [RouterTestingModule],
      providers: [
        provideMockStore(),
        { provide: Router, useValue: routerSpy },
        { provide: LocationStrategy, useClass: MockLocationStrategy }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    dispatchSpy = spyOn(store, 'dispatch').and.callFake(() => {});

    mockGetSelectedAnimalIdSelector = store.overrideSelector(
      getSelectedAnimalId,
      animalId
    );
    mockIsFetchingSelector = store.overrideSelector(
      WeightStore.selectors.isFetching,
      false
    );
    mockPaginationDataSelector = store.overrideSelector(
      WeightStore.selectors.paginationData,
      {
        pageSize: initialState.pageSize,
        pageNumber: initialState.pageNumber,
        recordCount: initialState.recordCount
      }
    );
    mockTransactionsSelector = store.overrideSelector(
      WeightStore.selectors.weightTransactionsForAnimal,
      items
    );

    fixture = TestBed.createComponent(WeightTransactionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();

    testScheduler = new TestScheduler((actual: any, expected: any) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch a fetchAnimalTransactions action on initialization', () => {
    expect(dispatchSpy).toHaveBeenCalledOnceWith(
      WeightStore.actions.fetchAnimalTransactions(0, environment.pageSize)
    );
  });

  it('should dispatch a fetchAnimalTransactions action when pagination changes', () => {
    dispatchSpy.calls.reset();

    testScheduler.run(({ flush }: RunHelpers) => {
      const pageEvent: PageEvent = {
        pageIndex: 2,
        pageSize: environment.pageSize,
        length: 15
      };
      component.onPageChanged(pageEvent);

      store.refreshState();
      flush();
      fixture.detectChanges();

      expect(dispatchSpy).toHaveBeenCalledWith(
        WeightStore.actions.fetchAnimalTransactions(2, environment.pageSize)
      );
    });
  });

  it('should listen for animal transaction changes on the store', () => {
    testScheduler.run(({ expectObservable, flush }: RunHelpers) => {
      items = [
        { id: 1, animalId, transactionDate: new Date(), weight: 40 },
        { id: 2, animalId, transactionDate: new Date(), weight: 50 },
        { id: 3, animalId, transactionDate: new Date(), weight: 60 },
        { id: 4, animalId, transactionDate: new Date(), weight: 70 },
        { id: 5, animalId, transactionDate: new Date(), weight: 80 },
        { id: 6, animalId, transactionDate: new Date(), weight: 90 },
        { id: 7, animalId, transactionDate: new Date(), weight: 100 }
      ];
      mockTransactionsSelector.setResult(items);

      store.refreshState();
      flush();
      fixture.detectChanges();

      expectObservable(component.transactions$).toBe('a', { a: items });
    });
  });

  it('should listen for isFetching changes on the store', () => {
    testScheduler.run(({ expectObservable, flush }: RunHelpers) => {
      mockIsFetchingSelector.setResult(true);

      store.refreshState();
      flush();
      fixture.detectChanges();

      expectObservable(component.isLoadingTransactions$).toBe('a', { a: true });
    });
  });

  it('should listen for pagination changes on the store', () => {
    testScheduler.run(({ expectObservable, flush }: RunHelpers) => {
      const pageState: PaginationState = {
        pageNumber: 2,
        pageSize: 15,
        recordCount: 28
      };
      mockPaginationDataSelector.setResult(pageState);

      store.refreshState();
      flush();
      fixture.detectChanges();

      expectObservable(component.pageSize$).toBe('a', {
        a: pageState.pageSize
      });
      expectObservable(component.pageNumber$).toBe('a', {
        a: pageState.pageNumber
      });
      expectObservable(component.recordCount$).toBe('a', {
        a: pageState.recordCount
      });
    });
  });

  it(`should navigate to 'new' when onAddTransaction is called`, () => {
    component.onAddTransaction();

    expect(routerSpy.navigateByUrl).toHaveBeenCalledOnceWith(
      `weight/${animalId}/new`
    );
  });

  it(`should dispatch a delete action when onDeleteTransaction is called`, () => {
    dispatchSpy.calls.reset();
    component.onDeleteTransaction(1);

    expect(dispatchSpy).toHaveBeenCalledOnceWith(
      WeightStore.actions.deleteItem(1)
    );
  });
});
