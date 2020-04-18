import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Animal } from '@core/models';
import { CrudService } from '@core/models/crud-service.interface';
import { PagedData } from '@core/models/paged-data.model';

@Injectable()
export class AnimalService
  implements CrudService<Animal, number, PagedData<Animal>> {
  private apiUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.apiUrl = baseUrl + 'animal';
  }

  public getAll = (
    pageSize = 10,
    pageNumber = 1
  ): Observable<PagedData<Animal>> =>
    this.http.get<PagedData<Animal>>(this.apiUrl, {
      params: {
        pageSize: pageSize.toString(),
        pageNumber: pageNumber.toString(),
      },
    });

  public get = (key: number): Observable<Animal> =>
    this.http.get<Animal>(`${this.apiUrl}/${key}`);

  public add = (item: Animal): Observable<Animal> =>
    this.http.post<Animal>(this.apiUrl, item);

  public update = (item: Animal, key: number): Observable<Animal> =>
    this.http.patch<Animal>(`${this.apiUrl}/${key}`, item);

  public delete = (key: number): Observable<number> =>
    this.http.delete<number>(`${this.apiUrl}/${key}`);
}
