import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { MatListOption, PageEvent } from '@angular/material';
import { Router, NavigationExtras } from '@angular/router';
import { LivestockService } from '@livestock/livestock.service';
import {
  Livestock,
  getAge as getAnimalAge
} from '@app/livestock/livestock.model';
import { environment } from '@env/environment';

@Component({
  selector: 'app-livestock-list',
  templateUrl: './livestock-list.component.html',
  styleUrls: ['./livestock-list.component.scss']
})
export class LivestockListComponent implements OnInit, OnDestroy {
  @Input() public livestockList: Livestock[];

  public pageSize: number;

  constructor(
    private livestockService: LivestockService,
    private router: Router
  ) {}

  ngOnInit() {
    this.pageSize = environment.pageSize;
  }

  public getSvgIcon(animal: Livestock): string {
    return this.livestockService.getSvgIcon(animal);
  }

  public removeLivestock(selectedItems: MatListOption[]) {
    try {
      for (const item of selectedItems) {
        this.livestockService.removeLivestock(item.value);
      }
    } catch (error) {
      console.error(error);
    }
  }

  public onEditItem(id: number) {
    try {
      const navigationExtras: NavigationExtras = {
        queryParams: { id: id }
      };
      this.router.navigate(['edit'], navigationExtras);
    } catch (error) {
      console.log(error);
    }
  }

  public onAddAnimal() {
    this.router.navigate(['/livestock', 'new']);
  }

  public onPage(pageEvent: PageEvent) {}

  public getAge(animal: Livestock): string {
    return getAnimalAge(animal);
  }

  ngOnDestroy() {}
}
