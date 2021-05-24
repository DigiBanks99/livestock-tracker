import { HttpClientModule } from '@angular/common/http';
import { NgModule, SecurityContext } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@NgModule({
  imports: [MatIconModule, HttpClientModule],
  exports: [MatIconModule]
})
export class SvgProviderModule {
  constructor(
    private readonly _matIconRegistry: MatIconRegistry,
    private readonly _sanitizer: DomSanitizer
  ) {
    this.registerSvgAsset('farmer', '/assets/farmer.svg');
    this.registerSvgAsset('cow', '/assets/cow.svg');
    this.registerSvgAsset('chicken', '/assets/cock.svg');
    this.registerSvgAsset('pig', '/assets/pig.svg');
    this.registerSvgAsset('sheep', '/assets/sheep.svg');
  }

  private registerSvgAsset(key: string, url: string): void {
    try {
      const sanitizedUrl = this._sanitizer.sanitize(SecurityContext.URL, url);
      this._matIconRegistry.addSvgIcon(
        key,
        this._sanitizer.bypassSecurityTrustResourceUrl(sanitizedUrl)
      );
    } catch (err) {
      console.error('The URL for an icon is not safe.', err);
    }
  }
}
