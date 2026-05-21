import { Injectable } from '@angular/core';
import { FeedType } from '@core/models';
import { ApiService } from '@core/services/api.service';

@Injectable({ providedIn: 'root' })
export class FeedTypeService extends ApiService<FeedType> {
  protected readonly baseUrl = '/api/FeedType';
}
