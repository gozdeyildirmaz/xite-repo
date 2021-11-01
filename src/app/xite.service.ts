import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class XiteService {

  constructor(private http: HttpClient) { }

  getDataset() {

    const url =  'http://raw.githubusercontent.com/XiteTV/frontend-coding-exercise/main/data/dataset.json';

    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded'});
    const options = {
      headers
    };
    return this.http.get<any>(url, options);
  }
}
