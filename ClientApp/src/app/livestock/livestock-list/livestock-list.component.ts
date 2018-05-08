import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatListOption } from '@angular/material';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { LiveStockType } from '../livestock-type.model';
import { LivestockService } from '../livestock.service';
import { Livestock } from '../livestock.model';

@Component({
  selector: 'app-livestock-list',
  templateUrl: './livestock-list.component.html',
  styleUrls: ['./livestock-list.component.css']
})
export class LivestockListComponent implements OnInit, OnDestroy {
  public livestockList: Livestock[];

  private livestockChanged: Subscription;

  constructor(
    private livestockService: LivestockService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.livestockList = this.livestockService.getLivestock();

    this.livestockChanged = this.livestockService.livestockChanged.subscribe((livestockList: Livestock[]) => {
      this.livestockList = livestockList;
    });
  }

  public getSvgIcon(animal: Livestock): string {
    return this.livestockService.getSvgIcon(animal);
  }

  removeLivestock(selectedItems: MatListOption[]) {
    try {
      for (const item of selectedItems) {
        this.livestockService.removeLivestock(item.value);
      }
    } catch (error) {
      console.error(error);
    }
  }

  onEditItem(id: number) {
    try {
      const navigationExtras: NavigationExtras = {
        queryParams: { 'id': id }
      };
      this.router.navigate(['edit'], navigationExtras);
    } catch (error) {
      console.log(error);
    }
  }

  ngOnDestroy() {
    this.livestockChanged.unsubscribe();
  }
}
