import axios, { type AxiosResponse } from 'axios';
import type { Release } from '../models/release';

export class ReleaseService {
  async get(): Promise<AxiosResponse<Release[]>> {
    return axios<Release[]>({
      method: 'GET',
      url: '/release.json'
    });
  }
}
