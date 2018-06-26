import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatSelect, MatSelectChange, PageEvent } from '@angular/material';
import { Subscription } from 'rxjs';
import { isNullOrUndefined } from 'util';

import * as moment from 'moment';

import { LivestockService } from '../livestock/livestock.service';
import { Livestock } from '../livestock/livestock.model';
import { MedicalTransaction } from './medical-transaction.model';
import { MedicalService } from './medical.service';
import { environment } from '../../environments/environment.prod';

@Component({
  selector: 'app-medical',
  templateUrl: './medical.component.html',
  styleUrls: ['./medical.component.scss']
})
export class MedicalComponent implements OnInit, OnDestroy {
  @ViewChild('animalSelector') animalSelector: MatSelect;
  public animals: Livestock[];
  public currentAnimal: Livestock;
  public medicalTransactions: MedicalTransaction[];
  public filteredMedicalTransactions: MedicalTransaction[];
  public pageSize: number;

  public livestockChanged: Subscription;
  public animalSelectorChanged: Subscription;
  public medicalTransactionsChanged: Subscription;
  private lastPage: number;

  constructor(private livestockService: LivestockService, private medicalService: MedicalService) {
    this.animals = [];
    this.currentAnimal = null;
    this.medicalTransactions = [];
    this.filteredMedicalTransactions = [];
    this.pageSize = environment.pageSize;
    this.lastPage = environment.defaultLastPage;
  }

  ngOnInit() {
    this.livestockService.getLivestock();
    this.livestockChanged = this.livestockService.livestockChanged
      .subscribe((animals: Livestock[]) => this.updateAnimalsList(animals));
    this.animalSelectorChanged = this.animalSelector.selectionChange
      .subscribe((change: MatSelectChange) => this.animalSelectorValueChanged(change));
    this.medicalTransactionsChanged = this.medicalService.medicalTransactionsChanged
      .subscribe((transactions: MedicalTransaction[]) => this.updateMedicalTransactionList(transactions));
  }

  public addMedicalTransaction(animal: Livestock) {
    this.medicalService.addMedicalTransaction(animal.id);
  }

  public getSvgIcon(animal: Livestock) {
    return this.livestockService.getSvgIcon(animal);
  }

  public onPage(pageEvent: PageEvent) {
    this.lastPage = pageEvent.pageIndex;
    this.filterList(pageEvent.pageSize, pageEvent.pageIndex);
  }

  private filterList(pageSize: number, pageIndex: number) {
    this.filteredMedicalTransactions.splice(0);
    const startIndex = pageSize * pageIndex;
    for (let i = startIndex; i < startIndex + pageSize; i++) {
      // if we passed the last item, let's not continue
      if (i >= this.medicalTransactions.length) {
        return;
      }
      this.filteredMedicalTransactions.push(this.medicalTransactions[i]);
    }
  }

  private updateAnimalsList(animals: Livestock[]) {
    this.animals = animals;
    if (!isNullOrUndefined(this.animals) && this.animals.length > 0) {
      this.currentAnimal = this.animals[0];
      this.medicalService.getMedicalTransactions(this.currentAnimal.id);
    }
  }

  private animalSelectorValueChanged(selectChanged: MatSelectChange) {
    this.currentAnimal = this.livestockService.getAnimal(selectChanged.value);
    this.medicalService.getMedicalTransactions(this.currentAnimal.id);
  }

  private updateMedicalTransactionList(transactions: MedicalTransaction[]) {
    this.medicalTransactions = transactions;
    if (this.medicalTransactions.length <= this.pageSize) {
      this.lastPage = 0;
    }

    this.filterList(this.pageSize, this.lastPage);
  }

  ngOnDestroy() {
    this.livestockChanged.unsubscribe();
    this.animalSelectorChanged.unsubscribe();
    this.medicalTransactionsChanged.unsubscribe();
  }
}
