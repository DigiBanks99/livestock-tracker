import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import * as moment from 'moment';

import { MedicalTransaction } from "./medical-transaction.model";
import { environment } from "../../environments/environment.prod";

@Injectable()
export class MedicalService {
  private medicalTransactions: MedicalTransaction[];

  public medicalTransactionsChanged: Subject<MedicalTransaction[]>;

  constructor(private http: HttpClient) {
    this.medicalTransactions = [];
    this.medicalTransactionsChanged = new Subject<MedicalTransaction[]>();
  }

  public getMedicalTransactions(id: number) {
    this.http.get(environment.apiUrl + 'medicalTransactions/' + id).subscribe((transactions: MedicalTransaction[]) => {
      this.medicalTransactions = transactions;
      this.emitMedicalTransactionsChanged();
    });
  }

  private emitMedicalTransactionsChanged() {
    this.medicalTransactionsChanged.next(this.medicalTransactions.slice());
  }
}
