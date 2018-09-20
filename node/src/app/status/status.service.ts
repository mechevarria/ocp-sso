import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {MessageService} from '../common/message.service';
import {Observable, of} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Config} from 'codelyzer';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  private statusUrl = '/springboot-api';

  constructor(private messageService: MessageService, private http: HttpClient) {
  }

  getStatus(): Observable<HttpResponse<Config>> {
    return this.http.get<Config>(this.statusUrl, {observe: 'response'})
      .pipe(
        catchError(error => {
          this.messageService.error(`getStatus() ${error.message}`);
          return of(error);
        })
      );
  }

}
