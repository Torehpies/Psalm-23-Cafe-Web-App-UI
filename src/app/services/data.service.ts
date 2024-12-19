// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class DataService {



//   constructor(private http: HttpClient) {}

//   // Method to get data from the API
//   getData(): Observable<any[]> {
//     return this.http.get<any[]>(this.apiUrl);
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  // private apiUrl = 'http://localhost:7000/';  // Replace with your actual API URL

  // constructor(private http: HttpClient) {}

  // // Ensure the response is typed as an array of any type (or replace 'any' with a specific type if needed)
  // getData(): Observable<any[]> {
  //   return this.http.get<any[]>(this.apiUrl);  // Fetch data from the API and ensure it returns an array
//  
}
