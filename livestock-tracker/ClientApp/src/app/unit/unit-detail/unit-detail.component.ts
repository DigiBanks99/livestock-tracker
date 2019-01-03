import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Unit } from '@unit/unit.model';

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

  public deleteUnit(typeCode: number) {
    this.remove.emit(typeCode);
  }

  private initForm() {
    this.unitForm = new FormGroup({
      typeCode: new FormControl(this.unit.typeCode),
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
