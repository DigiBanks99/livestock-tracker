import { Livestock } from './livestock.model';
import { OnInit, Injectable } from '@angular/core';
import { LiveStockType } from './livestock-type.model';

import { Subject } from 'rxjs/Subject';

interface ILivestockService {
  livestockChanged: Subject<Livestock[]>;
  getLivestock(): Livestock[];
}

@Injectable()
export class LivestockService implements ILivestockService, OnInit {
  private livestock: Livestock[];

  public livestockChanged: Subject<Livestock[]>;

  constructor() {
    this.livestock = [
      new Livestock(1, LiveStockType.Cattle, 'Brahman', 1, new Date(2018, 3, 22), new Date(2018, 4, 1), 1000, 1400, 120, 1),
      new Livestock(2, LiveStockType.Cattle, 'Brahman', 2, new Date(2018, 3, 23), new Date(2018, 4, 1), 1000, 1400, 120, 1),
      new Livestock(3, LiveStockType.Cattle, 'Fries', 3, new Date(2018, 3, 22), new Date(2018, 4, 1), 1000, 1400, 120, 1),
      new Livestock(4, LiveStockType.Cattle, 'Jersey', 4, new Date(2018, 3, 22), new Date(2018, 4, 1), 1000, 1400, 120, 1),
      new Livestock(5, LiveStockType.Cattle, 'Brahman', 5, new Date(2018, 3, 23), new Date(2018, 4, 1), 1000, 1400, 120, 1),
      new Livestock(6, LiveStockType.Cattle, 'Gurnsey', 6, new Date(2018, 3, 22), new Date(2018, 4, 1), 1000, 1400, 120, 1),
      new Livestock(7, LiveStockType.Cattle, 'Fries', 7, new Date(2018, 3, 22), new Date(2018, 4, 1), 1000, 1400, 120, 1),
      new Livestock(8, LiveStockType.Chicken, null, 8, new Date(2018, 3, 22), new Date(2018, 4, 1), 1000, 1400, 120, 1),
      new Livestock(9, LiveStockType.Pig, null, 9, new Date(2018, 3, 22), new Date(2018, 4, 1), 1000, 1400, 120, 1),
      new Livestock(10, LiveStockType.Sheep, null, 10, new Date(2018, 3, 22), new Date(2018, 4, 1), 1000, 1400, 120, 1)
    ];

    this.livestockChanged = new Subject<Livestock[]>();
  }

  ngOnInit() {
  }

  public getLivestock(): Livestock[] {
    return this.livestock.slice();
  }

  public removeLivestock(id: number) {
    if (this.livestock.length === 0) {
      return;
    }

    const index = this.livestock.map((animal) => {
      return animal.getId();
    }).indexOf(id);

    if (index < 0) {
      throw Error('Item not found');
    }

    this.livestock.splice(index, 1);
    this.emitLivestockChanged();
  }

  private emitLivestockChanged() {
    this.livestockChanged.next(this.getLivestock());
  }
}

export class MockLivestockService implements ILivestockService {
  public livestockChanged = new Subject<Livestock[]>();
  public getLivestock(): Livestock[] {
    return [];
  }
}
