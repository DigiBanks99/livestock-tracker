import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatIconRegistry, MatListOption } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
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

  constructor(private livestockService: LivestockService, private matIconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.livestockList = this.livestockService.getLivestock();
    this.matIconRegistry.addSvgIcon('cow', this.sanitizer.bypassSecurityTrustResourceUrl('./../../../assets/cow.svg'));
    this.matIconRegistry.addSvgIcon('chicken', this.sanitizer.bypassSecurityTrustResourceUrl('./../../../assets/cock.svg'));
    this.matIconRegistry.addSvgIcon('pig', this.sanitizer.bypassSecurityTrustResourceUrl('./../../../assets/pig.svg'));
    this.matIconRegistry.addSvgIcon('sheep', this.sanitizer.bypassSecurityTrustResourceUrl('./../../../assets/sheep.svg'));

    this.livestockChanged = this.livestockService.livestockChanged.subscribe((livestockList: Livestock[]) => {
      this.livestockList = livestockList;
    });
  }

  getSvgIcon(type: LiveStockType) {
    switch (type) {
      case LiveStockType.Cattle:
        return 'cow';
      case LiveStockType.Chicken:
        return 'chicken';
      case LiveStockType.Pig:
        return 'pig';
      case LiveStockType.Sheep:
        return 'sheep';
      default:
        throw Error(type + ' not implemented');
    }
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
      this.livestockService.editingStarted.next(id);
    } catch (error) {
      console.log(error);
    }
  }

  ngOnDestroy() {
    this.livestockChanged.unsubscribe();
  }
}
