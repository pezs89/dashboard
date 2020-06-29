import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpResponseBase,
  HttpResponse,
} from '@angular/common/http';
import { Observable, forkJoin, concat, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ServerCheckService {
  constructor(private http: HttpClient) {}

  getServerStatuses(regionUrls: Array<string>) {
    const requests = [];
    regionUrls.forEach((url) => {
      requests.push(
        this.http
          .get(url, { responseType: 'text', observe: 'response' })
          .pipe(catchError((err) => of(err)))
      );
    });
    return forkJoin(requests);
  }
}
