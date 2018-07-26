import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatListOption, PageEvent } from '@angular/material';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import * as moment from 'moment';

import { LiveStockType } from '../livestock-type.model';
import { LivestockService } from '../livestock.service';
import { Livestock } from '../livestock.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-livestock-list',
  templateUrl: './livestock-list.component.html',
  styleUrls: ['./livestock-list.component.scss']
})
export class LivestockListComponent implements OnInit, OnDestroy {
  public livestockList: Livestock[];
  public filteredLivestockList: Livestock[];
  public pageSize: number;

  private livestockChanged: Subscription;
  private lastPage: number;

  constructor(
    private livestockService: LivestockService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.pageSize = environment.pageSize;
    this.lastPage = environment.defaultLastPage;
    this.livestockList = [];
    this.filteredLivestockList = [];

    this.livestockChanged = this.livestockService.livestockChanged.subscribe((livestockList: Livestock[]) => {
      this.livestockList = livestockList;
      if (this.livestockList.length <= this.pageSize) {
        this.lastPage = 0;
      }

      this.filterList(this.pageSize, this.lastPage);
    });

    this.livestockService.getLivestock();
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
        queryParams: { 'id': id }
      };
      this.router.navigate(['edit'], navigationExtras);
    } catch (error) {
      console.log(error);
    }
  }

  public onAddAnimal() {
    this.router.navigate(['/livestock', 'new']);
  }

  public onPage(pageEvent: PageEvent) {
    this.lastPage = pageEvent.pageIndex;
    this.filterList(pageEvent.pageSize, pageEvent.pageIndex);
  }

  private filterList(pageSize: number, pageIndex: number) {
    this.filteredLivestockList.splice(0);
    const startIndex = pageSize * pageIndex;
    for (let i = startIndex; i < startIndex + pageSize; i++) {
      // if we passed the last item, let's not continue
      if (i >= this.livestockList.length) {
        return;
      }
      this.filteredLivestockList.push(this.livestockList[i]);
    }
  }

  ngOnDestroy() {
    this.livestockChanged.unsubscribe();
  }
}
