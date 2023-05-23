import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { KraalStats } from '@animal/models';

@Injectable({
  providedIn: 'root'
})
export class AnimalStatsService {
  constructor(private readonly _http: HttpClient) {}

  public getKraalStats(): Observable<KraalStats> {
    return this._http.get<KraalStats>('/api/animal/stats');
  }
}
