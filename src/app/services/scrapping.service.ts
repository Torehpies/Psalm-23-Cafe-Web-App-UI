import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '../models/response.model';
import { Scrapping } from '../models/scrapping.model';
import { apiUrls } from '../api.urls';

@Injectable({
  providedIn: 'root'
})
export class ScrappingService {
  constructor(private http: HttpClient) { }

  fetchScrappingData() {
    return this.http.get<Response<Scrapping[]>>(`${apiUrls.scrappingServiceApi}`);
  }

  addScrapping(scrapping: Scrapping) {
    return this.http.post(`${apiUrls.scrappingServiceApi}create`, scrapping);
  }
}
