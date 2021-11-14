import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';
import { DateUtils } from '@core/dates';

@Injectable({
  providedIn: 'root'
})
export class LivestockTrackerDateAdapter extends NativeDateAdapter {
  // eslint-disable-next-line @typescript-eslint/ban-types
  public format(date: Date, displayFormat: Object): string {
    return date.toLocaleDateString([
      ...(navigator.languages ?? [navigator.language])
    ]);
  }

  public parse(value: any): Date | null {
    if (typeof value === 'string') {
      return DateUtils.parseLocaleDate(value);
    } else {
      return value;
    }
  }
}
