import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MedicalTransaction, MedicineType, Unit } from '@core/models';

@Component({
  selector: 'app-medical-transaction-form',
  template: ''
})
export class MedicalTransactionFormStubComponent {
  @Input() public animalId = 0;
  @Input() public transaction: MedicalTransaction = {
    animalId: this.animalId,
    dose: null,
    id: 0,
    medicineId: null,
    transactionDate: new Date(),
    unitId: null
  };
  @Input() public isLoading = false;
  @Input() public medicineTypes: MedicineType[] = [];
  @Input() public units: Unit[] = [];

  @Output() public readonly save = new EventEmitter<MedicalTransaction>();
  @Output() public readonly navigateBack = new EventEmitter<void>();
}
