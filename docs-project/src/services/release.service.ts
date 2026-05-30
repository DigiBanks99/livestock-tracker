import type { Release } from '../models/release';

export class ReleaseService {
  async get(): Promise<Release[]> {
    const response = await fetch('/release.json');
    if (!response.ok) {
      throw new Error(`Failed to fetch releases: ${response.status} ${response.statusText}`);
    }
    return response.json() as Promise<Release[]>;
  }
}
