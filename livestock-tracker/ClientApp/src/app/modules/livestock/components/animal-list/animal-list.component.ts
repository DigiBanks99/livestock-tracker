import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatListOption } from '@angular/material/list';
import { PageEvent } from '@angular/material/paginator';
import { LivestockService } from '@animal/services/livestock.service';
import { Animal } from '@core/models';
import { environment } from '@env/environment';
import { AgeCalculatorService } from '@shared/services/age-calculator.service';

@Component({
  selector: 'app-animal-list',
  templateUrl: './animal-list.component.html',
  styleUrls: ['./animal-list.component.scss']
})
export class AnimalListComponent implements OnInit {
  @Input() public animals: Animal[];
  @Output() public remove = new EventEmitter<Animal>();
  @Output() public showDetail = new EventEmitter<number>();
  @Output() public addAnimal = new EventEmitter();

  public pageSize: number;

  constructor(
    private livestockService: LivestockService,
    private ageCalculatorService: AgeCalculatorService
  ) {}

  public ngOnInit(): void {
    this.pageSize = environment.pageSize;
  }

  public getSvgIcon(animal: Animal): string {
    return this.livestockService.getSvgIcon(animal);
  }

  public removeAnimal(selectedItems: MatListOption[]): void {
    for (const item of selectedItems) {
      this.remove.emit(item.value);
    }
  }

  public onEditAnimal(id: number): void {
    this.showDetail.emit(id);
  }

  public onAddAnimal(): void {
    this.addAnimal.emit();
  }

  public onPage(pageEvent: PageEvent): void {}

  public getAge(animal: Animal): string {
    return this.ageCalculatorService.calculateAge(
      animal.birthDate,
      animal.dateOfDeath
    );
  }
}
