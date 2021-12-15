import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";

export class Entry {
  tu!: string
  eng?: string[]
  definitions?: string[]
  examples?: string[]
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  tu(tu: string): Observable<Array<Entry>> {
    return this.http.get<Array<Entry>>(`http://localhost:8084/tu/${tu}`)
  }
}
