import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { MatListOption } from '@angular/material/list';
import { PageEvent } from '@angular/material/paginator';
import { LivestockService } from '@livestock/livestock.service';
import { Livestock } from '@livestock/livestock.model';
import { environment } from '@env/environment';
import { AgeCalculatorService } from '@livestock/age-calculator.service';

@Component({
  selector: 'app-livestock-list',
  templateUrl: './livestock-list.component.html',
  styleUrls: ['./livestock-list.component.scss']
})
export class LivestockListComponent implements OnInit {
  @Input() public livestockList: Livestock[];
  @Output() public remove = new EventEmitter<Livestock>();
  @Output() public showDetail = new EventEmitter<number>();
  @Output() public addAnimal = new EventEmitter();

  public pageSize: number;

  constructor(
    private livestockService: LivestockService,
    private ageCalculatorService: AgeCalculatorService
  ) {}

  ngOnInit() {
    this.pageSize = environment.pageSize;
  }

  public getSvgIcon(animal: Livestock): string {
    return this.livestockService.getSvgIcon(animal);
  }

  public removeLivestock(selectedItems: MatListOption[]) {
    for (const item of selectedItems) {
      this.remove.emit(item.value);
    }
  }

  public onEditAnimal(id: number) {
    this.showDetail.emit(id);
  }

  public onAddAnimal() {
    this.addAnimal.emit();
  }

  public onPage(pageEvent: PageEvent) {}

  public getAge(animal: Livestock): string {
    return this.ageCalculatorService.calculateAge(
      animal.birthDate,
      animal.dateOfDeath
    );
  }
}
