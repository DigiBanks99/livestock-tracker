import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  Output,
  EventEmitter
} from '@angular/core';

import { Unit } from '@unit/unit.model';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-unit-detail',
  templateUrl: './unit-detail.component.html',
  styleUrls: ['./unit-detail.component.scss']
})
export class UnitDetailComponent implements OnInit, OnDestroy {
  @Input() unit: Unit;
  @Output() save = new EventEmitter<Unit>();
  @Output() remove = new EventEmitter<number>();

  public unitForm: FormGroup;

  private onDescriptionChanged: Subscription;

  constructor() {
    this.unitForm = null;
  }

  ngOnInit() {
    this.initForm();
  }

  public deleteUnit(typeCode: number) {
    this.remove.emit(typeCode);
  }

  private initForm() {
    const descriptionControl = new FormControl(this.unit.description, [
      Validators.required
    ]);
    const formGroupSetup = {
      description: descriptionControl
    };
    this.unitForm = new FormGroup(formGroupSetup);

    this.onDescriptionChanged = this.unitForm
      .get('description')
      .valueChanges.subscribe(_ => this.updateUnit());
  }

  private updateUnit() {
    if (this.unitForm.valid) {
      this.save.emit(this.unitForm.value);
    }
  }

  ngOnDestroy() {
    if (!isNullOrUndefined(this.onDescriptionChanged)) {
      this.onDescriptionChanged.unsubscribe();
    }
  }
}
