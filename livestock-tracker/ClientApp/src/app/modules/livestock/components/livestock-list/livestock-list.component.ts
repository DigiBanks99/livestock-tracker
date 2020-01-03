import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatListOption } from '@angular/material/list';
import { PageEvent } from '@angular/material/paginator';
import { Animal } from '@app/core/models/livestock.model';
import { environment } from '@env/environment';
import { LivestockService } from '@livestock/services/livestock.service';
import { AgeCalculatorService } from '@shared/services/age-calculator.service';

@Component({
  selector: 'app-livestock-list',
  templateUrl: './livestock-list.component.html',
  styleUrls: ['./livestock-list.component.scss']
})
export class LivestockListComponent implements OnInit {
  @Input() public livestockList: Animal[];
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

  public removeLivestock(selectedItems: MatListOption[]): void {
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
