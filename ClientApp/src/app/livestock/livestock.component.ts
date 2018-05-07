import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-livestock',
  templateUrl: './livestock.component.html',
  styleUrls: ['./livestock.component.css']
})
export class LivestockComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

  onAddAnimal() {
    this.router.navigate(['new']);
  }

}
