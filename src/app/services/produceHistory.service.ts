import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '../models/response.model';
import { ProduceHistory } from '../models/produceHistory.model';
import { apiUrls } from '../api.urls';

@Injectable({
  providedIn: 'root'
})
export class ProduceHistoryService {

  constructor(private http: HttpClient) { }

  fetchProduceHistoryData() {
    return this.http.get<Response<ProduceHistory[]>>(`${apiUrls.produceHistoryServiceApi}`);
  }

  addProduceHistory(produceHistory: ProduceHistory) {
    return this.http.post(`${apiUrls.produceHistoryServiceApi}create`, produceHistory);
  }
}
