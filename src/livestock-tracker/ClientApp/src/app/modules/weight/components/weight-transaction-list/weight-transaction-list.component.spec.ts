import { TestData } from 'test/modules/animal';
import { LoaderTestingModule } from 'test/modules/shared/components/loader/loader.testing.module';

import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';
import {
  MatPaginatorModule,
  PageEvent
} from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import {
  getAnimals,
  getSelectedAnimal
} from '@core/store/selectors';
import { provideMockStore } from '@ngrx/store/testing';
import { SharedModule } from '@shared/shared.module';

import { WeightTransactionListComponent } from './weight-transaction-list.component';

describe('WeightTransactionListComponent', () => {
  let component: WeightTransactionListComponent;
  let fixture: ComponentFixture<WeightTransactionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WeightTransactionListComponent],
      imports: [
        LoaderTestingModule,
        MatPaginatorModule,
        MatTableModule,
        MatToolbarModule,
        NoopAnimationsModule,
        RouterTestingModule,
        SharedModule
      ],
      providers: [
        provideMockStore({
          selectors: [
            { selector: getAnimals, value: [TestData.LongAnimalList] },
            { selector: getSelectedAnimal, value: TestData.LongAnimalList[0] }
          ]
        })
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeightTransactionListComponent);
    component = fixture.componentInstance;
    spyOn(component.addTransaction, 'emit');
    spyOn(component.deleteTransaction, 'emit');
    spyOn(component.pageChanged, 'emit');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit addTransaction when onAdd is selected', () => {
    component.onAdd();
    expect(component.addTransaction.emit).toHaveBeenCalledTimes(1);
  });

  it('should emit deleteTransaction when delete is clicked in a row', () => {
    const id = 1;
    component.onDelete(id);

    expect(component.deleteTransaction.emit).toHaveBeenCalledTimes(1);
    expect(component.deleteTransaction.emit).toHaveBeenCalledOnceWith(id);
  });

  it('should emit pageChanged when the current page is changed', () => {
    const event: PageEvent = {
      pageIndex: 2,
      pageSize: 20,
      length: 80
    };
    component.onPage(event);

    expect(component.pageChanged.emit).toHaveBeenCalledTimes(1);
    expect(component.pageChanged.emit).toHaveBeenCalledOnceWith(event);
  });
});
