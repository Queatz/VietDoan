import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {environment} from '../environments/environment';

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

  constructor(private http: HttpClient) {
  }

  tu(tu: string): Observable<Array<Entry>> {
    return this.http.get<Array<Entry>>(`${environment.apiBaseUrl}/tu/${tu}`)
  }

  translate(tu: string): Observable<string> {
    const url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=vi&tl=en&dt=t&q=" + encodeURI(tu)

    return this.http.get<any>(url).pipe(
      map(x => x[0][0][0])
    )
  }
}
