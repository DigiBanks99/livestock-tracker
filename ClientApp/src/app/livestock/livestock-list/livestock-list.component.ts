import { Component, OnInit } from '@angular/core';
import { Livestock } from '../livestock.model';
import { LivestockService } from '../livestock.service';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { LiveStockType } from '../livestock-type.model';

@Component({
  selector: 'app-livestock-list',
  templateUrl: './livestock-list.component.html',
  styleUrls: ['./livestock-list.component.css']
})
export class LivestockListComponent implements OnInit {
  public livestockList: Livestock[];

  constructor(private livestockService: LivestockService, private matIconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.livestockList = this.livestockService.getLivestock();
    this.matIconRegistry.addSvgIcon('cow', this.sanitizer.bypassSecurityTrustResourceUrl('./../../../assets/cow.svg'));
    this.matIconRegistry.addSvgIcon('chicken', this.sanitizer.bypassSecurityTrustResourceUrl('./../../../assets/cock.svg'));
    this.matIconRegistry.addSvgIcon('pig', this.sanitizer.bypassSecurityTrustResourceUrl('./../../../assets/pig.svg'));
    this.matIconRegistry.addSvgIcon('sheep', this.sanitizer.bypassSecurityTrustResourceUrl('./../../../assets/sheep.svg'));
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
}
