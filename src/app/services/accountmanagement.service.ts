import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrls } from '../api.urls';
import { AccountManagement } from '../models/account-management.model';
import { Response } from '../models/response.model';

@Injectable({
    providedIn: 'root'
})
export class AccountManagementService {
    private apiUrl = apiUrls.accountManagementServiceApi;

    constructor(private http: HttpClient) { }

    getApprovedAccounts() {
        return this.http.get<Response<AccountManagement[]>>(`${this.apiUrl}approved`);
    }

    getUnapprovedAccounts() {
        return this.http.get<Response<AccountManagement[]>>(`${this.apiUrl}unapproved`);
    }

    approveAccount(id: string) {
        return this.http.patch<any>(`${this.apiUrl}approve/${id}`, {});
    }

    rejectAccount(id: string) {
        return this.http.patch<any>(`${this.apiUrl}reject/${id}`, {});
    }

    getAccountById(id: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/${id}`);
    }

    createAccount(account: any): Observable<any> {
        return this.http.post<any>(this.apiUrl, account);
    }

    updateAccount(id: string, account: any): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/${id}`, account);
    }

    deleteAccount(id: string): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${id}`);
    }

    disableAccount(id: string): Observable<any> {
        return this.http.patch<any>(`${this.apiUrl}/${id}/disable`, {});
    }
}
