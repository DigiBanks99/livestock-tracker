import { Observable } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Animal } from '@core/models';
import { CrudService } from '@core/models/crud-service.interface';

@Injectable()
export class AnimalService implements CrudService<Animal, number> {
  private apiUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.apiUrl = baseUrl + 'animal';
  }

  public getAll = (): Observable<Animal[]> =>
    this.http.get<Animal[]>(this.apiUrl);

  public get = (key: number): Observable<Animal> =>
    this.http.get<Animal>(`${this.apiUrl}/${key}`);

  public add = (item: Animal): Observable<Animal> =>
    this.http.post<Animal>(this.apiUrl, item);

  public update = (item: Animal, key: number): Observable<Animal> =>
    this.http.patch<Animal>(`${this.apiUrl}/${key}`, item);

  public delete = (key: number): Observable<number> =>
    this.http.delete<number>(`${this.apiUrl}/${key}`);
}
