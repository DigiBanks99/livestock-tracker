import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-livestock',
  templateUrl: './livestock.component.html',
  styleUrls: ['./livestock.component.scss']
})
export class LivestockComponent implements OnInit {
  public showLandingPage = true;
  public toggle = false;

  constructor( private router: Router) { }

  ngOnInit() {
  }

  public onAddAnimal() {
    this.router.navigate(['new']);
  }

  onActivate(event: any) {
    this.showLandingPage = false;
    console.log(event);
  }

  onDeactivate(event: any) {
    this.showLandingPage = true;
  }

}
