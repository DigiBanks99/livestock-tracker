import axios from 'axios';

export class ReleaseService {
  async get() {
    const apiRequest = {
      method: 'GET',
      url: '../release.json'
    };

    return await axios(apiRequest);
  }
}
