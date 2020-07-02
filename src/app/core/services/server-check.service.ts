import { Injectable } from '@angular/core';
import { HttpClient, HttpResponseBase } from '@angular/common/http';
import { forkJoin, of, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ServerCheckService {
  constructor(private http: HttpClient) {}

  getServerStatuses(regionUrls: Array<string>) {
    const requests: Observable<HttpResponseBase>[] = [];
    regionUrls.forEach(url => {
      requests.push(
        this.http
          .get<HttpResponseBase>(url, { observe: 'response' })
          .pipe(catchError(err => of(err)))
      );
    });
    return forkJoin(requests);
  }
}
