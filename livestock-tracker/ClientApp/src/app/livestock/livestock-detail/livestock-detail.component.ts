import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Livestock } from '@livestock/livestock.model';
import { LivestockService } from '@livestock/livestock.service';

@Component({
  selector: 'app-livestock-detail',
  templateUrl: './livestock-detail.component.html',
  styleUrls: ['./livestock-detail.component.scss']
})
export class LivestockDetailComponent {
  @Input() public currentAnimal: Livestock;

  private editID: number;

  constructor(
    private router: Router,
    private location: Location,
    private livestockService: LivestockService,
    private snackbarService: MatSnackBar
  ) {}

  public onSave(animal: Livestock) {
    this.livestockService.updateAnimal(animal);

    this.snackbarService.open('Item update!', 'Dismiss', {
      duration: 4000
    });
    this.router.navigate(['livestock']);
  }

  public onNavigateBack() {
    this.location.back();
  }
}
