import { Component, OnInit } from '@angular/core';
import { Livestock } from '../livestock.model';
import { LivestockService } from '../livestock.service';

@Component({
  selector: 'app-livestock-list',
  templateUrl: './livestock-list.component.html',
  styleUrls: ['./livestock-list.component.css']
})
export class LivestockListComponent implements OnInit {
  public livestockList: Livestock[];

  constructor(private livestockService: LivestockService) { }

  ngOnInit() {
    this.livestockList = this.livestockService.getLivestock();
  }

}
