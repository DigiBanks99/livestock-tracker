import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { LivestockService } from '../livestock/livestock.service';
import { Livestock } from '../livestock/livestock.model';
import { isNullOrUndefined } from 'util';
import { MatSelect, MatSelectChange } from '@angular/material';

@Component({
  selector: 'app-medical',
  templateUrl: './medical.component.html',
  styleUrls: ['./medical.component.scss']
})
export class MedicalComponent implements OnInit, OnDestroy {
  @ViewChild(MatSelect) animalSelector: MatSelect;
  public animals: Livestock[];
  public currentAnimal: Livestock;
  public x: number;

  public livestockChanged: Subscription;

  constructor(private livestockService: LivestockService) {
    this.animals = [];
    this.currentAnimal = null;
  }

  ngOnInit() {
    this.livestockService.getLivestock();
    this.livestockChanged = this.livestockService.livestockChanged.subscribe((animals: Livestock[]) => {
      this.animals = animals;
      if (!isNullOrUndefined(this.animals) && this.animals.length > 0) {
        this.currentAnimal = this.animals[0];
      }
    });

    this.animalSelector.ngAfterContentInit.bind(() => {
      this.animalSelector.writeValue(this.currentAnimal.id);
    });
    this.animalSelector.selectionChange.subscribe((change: MatSelectChange) => this.animalSelectorValueChanged(change));
  }

  public animalSelectorValueChanged(selectChanged: MatSelectChange) {
    this.currentAnimal = this.livestockService.getAnimal(selectChanged.value);
  }

  public test = console.log;

  public getSvgIcon(animal: Livestock) {
    return this.livestockService.getSvgIcon(animal);
  }

  ngOnDestroy() {
    this.livestockChanged.unsubscribe();
  }
}
