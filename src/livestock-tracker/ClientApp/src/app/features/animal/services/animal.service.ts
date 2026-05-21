import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Animal } from '@core/models';
import { ApiService } from '@core/services/api.service';

@Injectable({ providedIn: 'root' })
export class AnimalService extends ApiService<Animal> {
  protected readonly baseUrl = '/api/animal';

  archive(ids: number[]): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/Archive`, ids);
  }

  unarchive(ids: number[]): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/Unarchive`, ids);
  }

  recordDeath(animal: Partial<Animal>): Observable<Animal> {
    return this.http.put<Animal>(`${this.baseUrl}/Death`, animal);
  }

  recordSell(animal: Partial<Animal>): Observable<Animal> {
    return this.http.put<Animal>(`${this.baseUrl}/Sell`, animal);
  }
}
