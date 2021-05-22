import { RunHelpers } from 'rxjs/internal/testing/TestScheduler';
import { TestScheduler } from 'rxjs/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { SaveState } from '@core/models';
import { AnimalState } from '@core/store';
import { getSelectedAnimalId } from '@core/store/selectors';
import { DefaultProjectorFn, MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { WeightTestData, WeightTestingModule } from '@test/weight';
import { WeightState } from '@weight/interfaces';
import { WeightStore } from '@weight/store';

import { WeightTransactionsNewPage } from './weight-transactions-new.page';

describe('WeightTransactionsNewPage', () => {
  let fixture: ComponentFixture<WeightTransactionsNewPage>;
  let component: WeightTransactionsNewPage;
  let store: MockStore<WeightState>;
  let dispatchSpy: jasmine.Spy;
  let routerSpy: jasmine.SpyObj<Router>;
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
  let testScheduler: TestScheduler;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj<Router>(Router.name, ['navigateByUrl']);
    await TestBed.configureTestingModule({
      declarations: [WeightTransactionsNewPage],
      imports: [WeightTestingModule],
      providers: [provideMockStore(), { provide: Router, useValue: routerSpy }]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    dispatchSpy = spyOn(store, 'dispatch').and.callFake(() => {});

    mockAnimalIdSelector = store.overrideSelector(getSelectedAnimalId, 0);

    mockIsFetchingSelector = store.overrideSelector(
      WeightStore.selectors.isFetching,
      false
    );

    mockSaveStateSelector = store.overrideSelector(
      WeightStore.selectors.saveState,
      SaveState.New
    );

    fixture = TestBed.createComponent(WeightTransactionsNewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();

    testScheduler = new TestScheduler((actual: any, expected: any) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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

  it('should dispatch a new addItem action when saving', () => {
    component.onSave(WeightTestData.SmallTransactionList[0]);

    fixture.detectChanges();

    expect(dispatchSpy).toHaveBeenCalledWith(
      WeightStore.actions.addItem(WeightTestData.SmallTransactionList[0])
    );
  });

  it('should dispatch a navigation request to the previous route when navigating back', () => {
    component.onNavigateBack();

    expect(routerSpy.navigateByUrl).toHaveBeenCalledOnceWith('weight');
  });

  it('should navigate back to the list view on saveSuccess', () => {
    testScheduler.run(({ flush }: RunHelpers) => {
      mockSaveStateSelector.setResult(SaveState.Success);

      store.refreshState();
      flush();
      fixture.detectChanges();

      expect(routerSpy.navigateByUrl).toHaveBeenCalledWith('weight');
    });
  });

  it('should reset the saveState on saveSuccess', () => {
    testScheduler.run(({ flush }: RunHelpers) => {
      mockSaveStateSelector.setResult(SaveState.Success);

      store.refreshState();
      flush();
      fixture.detectChanges();

      expect(dispatchSpy).toHaveBeenCalledOnceWith(
        WeightStore.actions.resetSaveState()
      );
    });
  });
});
