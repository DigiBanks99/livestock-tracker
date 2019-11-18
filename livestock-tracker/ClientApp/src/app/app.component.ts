import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(
    private matIconRegistry: MatIconRegistry,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.matIconRegistry.addSvgIcon(
      'farmer',
      this.sanitizer.bypassSecurityTrustResourceUrl('./../assets/farmer.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'cow',
      this.sanitizer.bypassSecurityTrustResourceUrl('./../assets/cow.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'chicken',
      this.sanitizer.bypassSecurityTrustResourceUrl('./../assets/cock.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'pig',
      this.sanitizer.bypassSecurityTrustResourceUrl('./../assets/pig.svg')
    );
    this.matIconRegistry.addSvgIcon(
      'sheep',
      this.sanitizer.bypassSecurityTrustResourceUrl('./../assets/sheep.svg')
    );
  }
}
