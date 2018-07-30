import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';

import { Unit } from '../unit.model';
import { UnitService } from '../unit.service';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-unit-detail',
  templateUrl: './unit-detail.component.html',
  styleUrls: ['./unit-detail.component.scss']
})
export class UnitDetailComponent implements OnInit, OnDestroy {
  @Input() unit: Unit;

  public unitForm: FormGroup;

  private onDescriptionChanged: Subscription;

  constructor(private unitService: UnitService) {
    this.unitForm = null;
  }

  ngOnInit() {
    this.initForm();
  }

  public deleteUnit(typecode: number) {
    this.unitService.deleteUnit(typecode);
  }

  private initForm() {
    const descriptionControl = new FormControl(this.unit.description, [Validators.required]);
    const formGroupSetup = {
      description: descriptionControl
    };
    this.unitForm = new FormGroup(formGroupSetup);

    this.onDescriptionChanged = this.unitForm
      .get('description')
      .valueChanges.subscribe((description: string) =>
        this.updateUnit(description)
      );
  }

  private updateUnit(description: string) {
    this.unit.description = description;
    this.unitService.updateUnit(this.unit);
  }

  ngOnDestroy() {
    if (!isNullOrUndefined(this.onDescriptionChanged)) {
      this.onDescriptionChanged.unsubscribe();
    }
  }
}
