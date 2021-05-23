import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MedicalTransaction, MedicineType, Unit } from '@core/models';

@Component({
  selector: 'app-medical-transaction-form',
  template: ''
})
export class MedicalTransactionFormStubComponent {
  @Input() public selectedAnimalId = 0;
  @Input() public medicalTransaction: MedicalTransaction = {
    animalId: this.selectedAnimalId,
    dose: null,
    id: 0,
    medicineId: null,
    transactionDate: new Date(),
    unitId: null
  };
  @Input() public medicineTypes: MedicineType[] = [];
  @Input() public units: Unit[] = [];

  @Output() public save = new EventEmitter<MedicalTransaction>();
}
