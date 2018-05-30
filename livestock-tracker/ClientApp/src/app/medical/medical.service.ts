import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { isNullOrUndefined } from 'util';

import * as moment from 'moment';

import { MedicalTransaction } from './medical-transaction.model';
import { environment } from '../../environments/environment.prod';

@Injectable()
export class MedicalService {
  private medicalTransactions: MedicalTransaction[];
  private urlBase = environment.apiUrl + 'medicalTransactions/';

  public medicalTransactionsChanged: Subject<MedicalTransaction[]>;

  constructor(private http: HttpClient) {
    this.medicalTransactions = [];
    this.medicalTransactionsChanged = new Subject<MedicalTransaction[]>();
  }

  public getMedicalTransactions(animalID: number) {
    this.http.get(this.urlBase + animalID).subscribe((transactions: MedicalTransaction[]) => {
      this.medicalTransactions = transactions;
      this.emitMedicalTransactionsChanged();
    });
  }

  public getMedicalTransaction(id: number): MedicalTransaction {
    const index = this.indexOf(id);

    if (index < 0) {
      throw Error('Item not found');
    }

    return this.medicalTransactions.slice()[index];
  }

  public addMedicalTransaction(animalID: number) {
    let medicalTransaction = new MedicalTransaction();
    medicalTransaction.animalID = animalID;
    medicalTransaction.dose = 1;
    medicalTransaction.medecineTypeCode = 1;
    medicalTransaction.transactionDate = new Date();
    medicalTransaction.unit = 1;
    this.http.post(this.urlBase, medicalTransaction).subscribe((savedTransaction: MedicalTransaction) => {
      medicalTransaction = savedTransaction;
      this.medicalTransactions.push(medicalTransaction);
      this.emitMedicalTransactionsChanged();
    });
  }

  public updateMedicalTransaction(medicalTransaction: MedicalTransaction) {
    const index = this.indexOf(medicalTransaction.id);
    if (index > this.medicalTransactions.length) {
      throw Error('Index out of bounds');
    }

    const transactionToUpdate = this.medicalTransactions[index];
    this.http.put(this.urlBase + medicalTransaction.id, medicalTransaction).subscribe((updatedTransaction: MedicalTransaction) => {
      medicalTransaction = updatedTransaction;
      this.emitMedicalTransactionsChanged();
    });
  }

  private emitMedicalTransactionsChanged() {
    this.medicalTransactionsChanged.next(this.medicalTransactions.slice());
  }

  private indexOf(id: number): number {
    if (isNullOrUndefined(id) || id === 0) {
      return null;
    }

    if (this.medicalTransactions.length === 0) {
      throw Error('Item not found');
    }

    const index = this.medicalTransactions.map((transaction) => {
      return transaction.id;
    }).indexOf(id);

    return index;
  }
}
