import { Observable, of } from 'rxjs';
import { RunHelpers } from 'rxjs/internal/testing/TestScheduler';
import { TestScheduler } from 'rxjs/testing';

import { LocationStrategy } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockLocationStrategy } from '@angular/common/testing';
import { TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AnimalService } from '@animal/services';
import { AnimalStore } from '@animal/store';
import { AnimalEffects } from '@animal/store/animal.effects';
import { AnimalState } from '@core/store';
import { getSelectedAnimalId } from '@core/store/selectors';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';

describe('AnimalEffects', () => {
  let effects: AnimalEffects;
  let actions$: Observable<Action>;
  let testScheduler: TestScheduler;
  let serviceSpy: jasmine.SpyObj<AnimalService>;

  beforeEach(() => {
    serviceSpy = jasmine.createSpyObj<AnimalService>(AnimalService.name, [
      'add',
      'archiveAnimals',
      'delete',
      'get',
      'getAll',
      'unarchiveAnimals',
      'update'
    ]);

    TestBed.configureTestingModule({
      providers: [
        { provide: AnimalService, useValue: serviceSpy },
        AnimalEffects,
        provideMockActions(() => actions$),
        provideMockStore<AnimalState>({
          selectors: [{ selector: getSelectedAnimalId, value: 1 }]
        }),
        { provide: LocationStrategy, useClass: MockLocationStrategy }
      ],
      imports: [
        HttpClientTestingModule,
        MatSnackBarModule,
        NoopAnimationsModule,
        RouterTestingModule
      ]
    });

    effects = TestBed.inject(AnimalEffects);
    actions$ = TestBed.inject(Actions);

    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should create', () => {
    expect(effects).toBeTruthy();
  });

  describe('archiveAnimals$', () => {
    it('should return a NOOP action when successful', () => {
      testScheduler.run(({ cold, expectObservable, flush }: RunHelpers) => {
        const completion = {
          type: 'NOOP'
        };

        serviceSpy.archiveAnimals.and.returnValue(of(void 0));

        actions$ = cold('a', {
          a: new AnimalStore.actions.ArchiveAnimals([1, 5, 17])
        });

        expectObservable(effects.archiveAnimals$).toBe('a', { a: completion });

        flush();

        expect(serviceSpy.archiveAnimals).toHaveBeenCalledTimes(1);
      });
    });

    it('should return an apiError action when the http service fails', () => {
      testScheduler.run(({ cold, expectObservable, flush }: RunHelpers) => {
        const error = new Error('Network connection error');
        const completion = AnimalStore.actions.apiError(error);
        const switchMapMarble = '(a|)';

        actions$ = cold('a', {
          a: new AnimalStore.actions.ArchiveAnimals([1])
        });

        serviceSpy.archiveAnimals.and.throwError(error.message);

        expectObservable(effects.archiveAnimals$).toBe(switchMapMarble, {
          a: completion
        });

        flush();

        expect(serviceSpy.archiveAnimals).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('unarchiveAnimals$', () => {
    it('should return a NOOP action when successful', () => {
      testScheduler.run(({ cold, expectObservable, flush }: RunHelpers) => {
        const completion = {
          type: 'NOOP'
        };

        serviceSpy.unarchiveAnimals.and.returnValue(of(void 0));

        actions$ = cold('a', {
          a: new AnimalStore.actions.UnarchiveAnimals([1, 5, 17])
        });

        expectObservable(effects.unarchiveAnimals$).toBe('a', {
          a: completion
        });

        flush();

        expect(serviceSpy.unarchiveAnimals).toHaveBeenCalledTimes(1);
      });
    });

    it('should return an apiError action when the http service fails', () => {
      testScheduler.run(({ cold, expectObservable, flush }: RunHelpers) => {
        const error = new Error('Network connection error');
        const completion = AnimalStore.actions.apiError(error);
        const switchMapMarble = '(a|)';

        actions$ = cold('a', {
          a: new AnimalStore.actions.UnarchiveAnimals([1])
        });

        serviceSpy.unarchiveAnimals.and.throwError(error.message);

        expectObservable(effects.unarchiveAnimals$).toBe(switchMapMarble, {
          a: completion
        });

        flush();

        expect(serviceSpy.unarchiveAnimals).toHaveBeenCalledTimes(1);
      });
    });
  });
});
