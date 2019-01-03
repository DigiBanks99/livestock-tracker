import { Component, OnInit, OnDestroy, Input, OnChanges } from '@angular/core';
import { PageEvent } from '@angular/material';
import { Subscription } from 'rxjs';
import { Livestock } from '@livestock/livestock.model';
import { MedicalTransaction } from '@medical/medical-transaction.model';
import { MedicalService } from '@medical/medical.service';
import { environment } from '@env/environment';

@Component({
  selector: 'app-medical',
  templateUrl: './medical.component.html',
  styleUrls: ['./medical.component.scss']
})
export class MedicalComponent implements OnInit, OnChanges, OnDestroy {
  @Input() public currentAnimal: Livestock;
  public medicalTransactions: MedicalTransaction[];
  public filteredMedicalTransactions: MedicalTransaction[];
  public pageSize: number;

  public medicalTransactionsChanged: Subscription;
  private lastPage: number;

  constructor(private medicalService: MedicalService) {
    this.currentAnimal = null;
    this.medicalTransactions = [];
    this.filteredMedicalTransactions = [];
    this.pageSize = environment.pageSize;
    this.lastPage = environment.defaultLastPage;
  }

  ngOnInit() {
    this.medicalTransactionsChanged = this.medicalService.medicalTransactionsChanged.subscribe(
      (transactions: MedicalTransaction[]) =>
        this.updateMedicalTransactionList(transactions)
    );
  }

  ngOnChanges() {
    this.medicalService.getMedicalTransactions(this.currentAnimal.id);
  }

  public addMedicalTransaction(animal: Livestock) {
    this.medicalService.addMedicalTransaction(animal.id);
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

  private updateMedicalTransactionList(transactions: MedicalTransaction[]) {
    this.medicalTransactions = transactions;
    if (this.medicalTransactions.length <= this.pageSize) {
      this.lastPage = 0;
    }

    this.filterList(this.pageSize, this.lastPage);
  }

  ngOnDestroy() {
    this.medicalTransactionsChanged.unsubscribe();
  }
}
