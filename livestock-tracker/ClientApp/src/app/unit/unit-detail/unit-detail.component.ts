import { Component, OnInit, Input } from '@angular/core';
import { Unit } from '../unit.model';

@Component({
  selector: 'app-unit-detail',
  templateUrl: './unit-detail.component.html',
  styleUrls: ['./unit-detail.component.scss']
})
export class UnitDetailComponent implements OnInit {
  @Input() unit: Unit;

  constructor() { }

  ngOnInit() {
  }

}
