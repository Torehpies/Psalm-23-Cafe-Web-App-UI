import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Response } from '../models/response.model';
import { UsedSupplies } from '../models/usedSupplies.model';
import { apiUrls } from '../api.urls';

@Injectable({
  providedIn: 'root'
})
export class UsedSuppliesService {

  constructor(private http: HttpClient) { }

  fetchUsedSuppliesData() {
    return this.http.get<Response<UsedSupplies[]>>(`${apiUrls.usedSuppliesServiceApi}`);
  }

  addUsedSupplies(usedSupplies: UsedSupplies[]) {
    return this.http.post(`${apiUrls.usedSuppliesServiceApi}/create`, usedSupplies);
  }
}
