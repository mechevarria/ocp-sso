import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MessageService} from './message.service';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {catchError} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class StatusService {
  private statusUrl = '/jboss-api/status';

  constructor(private messageService: MessageService, private http: HttpClient) {
  }

  getStatus(): Observable<any[]> {
    return this.http.get<any[]>(this.statusUrl)
      .pipe(
        catchError(error => {
          this.messageService.error(`getStatus() ${error.message}`);
          return of(null);
        })
      );
  }

}
