import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { LivestockService } from './../livestock/livestock.service';
import { Livestock } from './../livestock/livestock.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  public animals: Livestock[];
  private animalsChangedSubscription: Subscription;

  constructor(private livestockService: LivestockService) {
  }

  ngOnInit() {
    this.animals = [];
    this.animalsChangedSubscription = this.livestockService.livestockChanged.subscribe((animals: Livestock[]) =>  {
      this.animals = animals;
    });
    this.livestockService.getLivestock();
  }

  ngOnDestroy() {
    this.animalsChangedSubscription.unsubscribe();
  }
}
