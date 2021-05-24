import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WeightTransaction } from '@weight/interfaces';

@Component({
  selector: 'app-weight-transaction-form',
  template: ''
})
export class WeightTransactionFormStubComponent {
  @Input() public animalId: number;
  @Input() public transaction: WeightTransaction;
  @Input() public isLoading = false;
  @Input() public isSaving = false;

  @Output() public navigateBack = new EventEmitter();
  @Output() public save = new EventEmitter<WeightTransaction>();
}
