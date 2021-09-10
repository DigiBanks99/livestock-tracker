import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AnimalProviderModule } from '@animal/animal-provider.module';
import { BaseUrl } from '@core/di';
import { Animal, PagedData } from '@core/models';
import { CrudService } from '@core/models/services';

@Injectable({
  providedIn: AnimalProviderModule
})
export class AnimalService implements CrudService<Animal, number, number> {
  private apiUrl: string;

  constructor(private http: HttpClient, @Inject(BaseUrl) baseUrl: string) {
    this.apiUrl = baseUrl + 'animal';
  }

  public getAll = (
    pageSize = 10,
    pageNumber = 1
  ): Observable<PagedData<Animal>> =>
    this.http.get<PagedData<Animal>>(this.apiUrl, {
      params: {
        pageNumber: pageNumber.toString(),
        pageSize: pageSize.toString()
      }
    });

  public get = (key: number): Observable<Animal> =>
    this.http.get<Animal>(`${this.apiUrl}/${key}`);

  public add = (item: Animal): Observable<Animal> =>
    this.http.post<Animal>(this.apiUrl, item);

  public update = (item: Animal, key: number): Observable<Animal> =>
    this.http.put<Animal>(`${this.apiUrl}/${key}`, item);

  public delete = (key: number): Observable<number> =>
    this.http.delete<number>(`${this.apiUrl}/${key}`);
}
