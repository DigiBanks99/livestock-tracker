import { RunHelpers } from 'rxjs/internal/testing/TestScheduler';
import { TestScheduler } from 'rxjs/testing';

import { LocationStrategy } from '@angular/common';
import { MockLocationStrategy } from '@angular/common/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { SaveState } from '@core/models';
import { AnimalState } from '@core/store';
import { getSelectedAnimalId } from '@core/store/selectors';
import { DefaultProjectorFn, MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { WeightTestData, WeightTestingModule } from '@test/weight';
import { WeightState, WeightTransaction } from '@weight/interfaces';
import { WeightStore } from '@weight/store';

import { WeightTransactionsEditPage } from './weight-transactions-edit.page';

describe('WeightTransactionsEditPage', () => {
  let fixture: ComponentFixture<WeightTransactionsEditPage>;
  let component: WeightTransactionsEditPage;
  let store: MockStore<WeightState>;
  let dispatchSpy: jasmine.Spy;
  let mockAnimalIdSelector: MemoizedSelector<
    AnimalState,
    number,
    DefaultProjectorFn<number>
  >;
  let mockIsFetchingSelector: MemoizedSelector<
    WeightState,
    boolean,
    DefaultProjectorFn<boolean>
  >;
  let mockSaveStateSelector: MemoizedSelector<
    WeightState,
    SaveState,
    DefaultProjectorFn<SaveState>
  >;
  let mockSelectedWeightTransaction: MemoizedSelector<
    WeightState,
    WeightTransaction,
    DefaultProjectorFn<WeightTransaction>
  >;
  let routerSpy: jasmine.SpyObj<Router>;
  let testScheduler: TestScheduler;

  beforeEach(async () => {
    testScheduler = new TestScheduler((actual: any, expected: any) => {
      expect(actual).toEqual(expected);
    });

    routerSpy = jasmine.createSpyObj<Router>(Router.name, ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [WeightTransactionsEditPage],
      imports: [WeightTestingModule, RouterTestingModule],
      providers: [
        provideMockStore(),
        { provide: Router, useValue: routerSpy },
        { provide: LocationStrategy, useClass: MockLocationStrategy }
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    dispatchSpy = spyOn(store, 'dispatch');

    mockAnimalIdSelector = store.overrideSelector(getSelectedAnimalId, 0);

    mockIsFetchingSelector = store.overrideSelector(
      WeightStore.selectors.isFetching,
      false
    );

    mockSaveStateSelector = store.overrideSelector(
      WeightStore.selectors.saveState,
      SaveState.New
    );

    mockSelectedWeightTransaction = store.overrideSelector(
      WeightStore.selectors.selectedWeightTransaction,
      null
    );

    fixture = TestBed.createComponent(WeightTransactionsEditPage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch a new updateItem action when saving', () => {
    component.onSave(WeightTestData.SmallTransactionList[0]);

    fixture.detectChanges();

    expect(dispatchSpy).toHaveBeenCalledWith(
      WeightStore.actions.updateItem(
        WeightTestData.SmallTransactionList[0],
        WeightTestData.SmallTransactionList[0].id
      )
    );
  });

  it('should dispatch a navigation request to the previous route when navigating back', () => {
    component.onNavigateBack();

    expect(routerSpy.navigate).toHaveBeenCalledOnceWith(['..']);
  });

  it('should listen to selectedAnimalId changes on the store', () => {
    testScheduler.run(({ expectObservable, flush }: RunHelpers) => {
      mockAnimalIdSelector.setResult(3);

      store.refreshState();
      flush();
      fixture.detectChanges();

      expectObservable(component.animalId$).toBe('a', { a: 3 });
    });
  });

  it('should listen to isFetching changes on the store', () => {
    testScheduler.run(({ expectObservable, flush }: RunHelpers) => {
      mockIsFetchingSelector.setResult(true);

      store.refreshState();
      flush();
      fixture.detectChanges();

      expectObservable(component.isFetching$).toBe('a', { a: true });
    });
  });

  it('should listen to saveState changes on the store and map it to a boolean', () => {
    testScheduler.run(({ expectObservable, flush }: RunHelpers) => {
      mockSaveStateSelector.setResult(SaveState.Saving);

      store.refreshState();
      flush();
      fixture.detectChanges();

      expectObservable(component.isSaving$).toBe('a', { a: true });
    });
  });

  it('should listen to selectedWeightTransaction changes on the store', () => {
    testScheduler.run(({ expectObservable, flush }: RunHelpers) => {
      mockSelectedWeightTransaction.setResult({
        ...WeightTestData.SmallTransactionList[0]
      });

      store.refreshState();
      flush();
      fixture.detectChanges();

      expectObservable(component.transaction$).toBe('a', {
        a: { ...WeightTestData.SmallTransactionList[0] }
      });
    });
  });

  it('should return false if saveState in the store is New', () => {
    testScheduler.run(({ expectObservable, flush }: RunHelpers) => {
      mockSaveStateSelector.setResult(SaveState.New);

      store.refreshState();
      flush();
      fixture.detectChanges();

      expectObservable(component.isSaving$).toBe('a', { a: false });
    });
  });

  it('should return false if saveState in the store is Success', () => {
    testScheduler.run(({ expectObservable, flush }: RunHelpers) => {
      mockSaveStateSelector.setResult(SaveState.Success);

      store.refreshState();
      flush();
      fixture.detectChanges();

      expectObservable(component.isSaving$).toBe('a', { a: false });
    });
  });

  it('should return false if saveState in the store is Conflict', () => {
    testScheduler.run(({ expectObservable, flush }: RunHelpers) => {
      mockSaveStateSelector.setResult(SaveState.Conflict);

      store.refreshState();
      flush();
      fixture.detectChanges();

      expectObservable(component.isSaving$).toBe('a', { a: false });
    });
  });

  it('should return false if saveState in the store is Failed', () => {
    testScheduler.run(({ expectObservable, flush }: RunHelpers) => {
      mockSaveStateSelector.setResult(SaveState.Failed);

      store.refreshState();
      flush();
      fixture.detectChanges();

      expectObservable(component.isSaving$).toBe('a', { a: false });
    });
  });
});
