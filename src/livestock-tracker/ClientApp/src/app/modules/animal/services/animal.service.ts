import { Observable } from 'rxjs';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AnimalProviderModule } from '@animal/animal-provider.module';
import { AnimalOrderType } from '@animal/enums';
import { BaseUrl } from '@core/di';
import { Animal, OrderOptions, PagedData } from '@core/models';
import { CrudService } from '@core/models/services';

@Injectable({
  providedIn: AnimalProviderModule
})
export class AnimalService implements CrudService<Animal, number, number> {
  private readonly _apiUrl: string;

  constructor(private _http: HttpClient, @Inject(BaseUrl) baseUrl: string) {
    this._apiUrl = baseUrl + 'animal';
  }

  public archiveAnimals = (animalIds: number[]): Observable<void> =>
    this._http.post<void>(`${this._apiUrl}/Archive`, animalIds);

  public getAll = (
    pageSize = 10,
    pageNumber = 1,
    orderOptions: OrderOptions<AnimalOrderType> = null,
    includeArchived = false
  ): Observable<PagedData<Animal>> => {
    const paramMap = {
      ['pagingOptions.pageSize']: pageSize,
      ['pagingOptions.pageNumber']: pageNumber,
      includeArchived
    };
    if (orderOptions != null) {
      paramMap['orderingOptions.direction'] = orderOptions.direction;
      paramMap['orderingOptions.property'] =
        orderOptions.property ?? AnimalOrderType.Number;
    }
    const params = new HttpParams({ fromObject: paramMap });
    return this._http.get<PagedData<Animal>>(this._apiUrl, {
      params
    });
  };

  public get = (key: number): Observable<Animal> =>
    this._http.get<Animal>(`${this._apiUrl}/${key}`);

  public add = (item: Animal): Observable<Animal> =>
    this._http.post<Animal>(this._apiUrl, item);

  public update = (item: Animal, key: number): Observable<Animal> =>
    this._http.put<Animal>(`${this._apiUrl}/${key}`, item);

  public delete = (key: number): Observable<number> =>
    this._http.delete<number>(`${this._apiUrl}/${key}`);

  public unarchiveAnimals = (animalIds: number[]): Observable<void> =>
    this._http.post<void>(`${this._apiUrl}/Archive`, animalIds);
}
