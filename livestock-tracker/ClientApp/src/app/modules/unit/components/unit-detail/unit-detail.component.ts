import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Unit } from '@core/models/unit.model';

@Component({
  selector: 'app-unit-detail',
  templateUrl: './unit-detail.component.html',
  styleUrls: ['./unit-detail.component.scss']
})
export class UnitDetailComponent implements OnInit {
  @Input() unit: Unit;
  @Output() save = new EventEmitter<Unit>();
  @Output() remove = new EventEmitter<number>();

  public unitForm: FormGroup;

  constructor() {
    this.unitForm = null;
  }

  ngOnInit() {
    this.initForm();
  }

  public deleteUnit(id: number) {
    this.remove.emit(id);
  }

  private initForm() {
    this.unitForm = new FormGroup({
      id: new FormControl(this.unit.id),
      description: new FormControl(this.unit.description, {
        validators: [Validators.required],
        updateOn: 'blur'
      })
    });
  }

  public updateUnit() {
    if (this.unitForm.valid) {
      this.save.emit(this.unitForm.value);
    }
  }
}
