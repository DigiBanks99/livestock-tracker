import { InjectionToken } from '@angular/core';

export const BaseUrl = new InjectionToken<string>('BaseUrl', {
  providedIn: 'root',
  factory: getBaseUrl
});

export const BaseUrlProvider = { provide: BaseUrl, useFactory: getBaseUrl };

function getBaseUrl() {
  return `${document.getElementsByTagName('base')[0].href}api/`;
}
