import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {People} from '../people';
import {catchError} from 'rxjs/operators';
import {MessageService} from './message.service';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class PeopleService {
  private peopleUrl = 'api/people';

  constructor(private messageService: MessageService, private http: HttpClient) {
  }

  getPeople(): Observable<People[]> {
    return this.http.get<People[]>(this.peopleUrl)
      .pipe(
        catchError(error => {
          this.messageService.error(`getPeople() ${error.message}`);
          return of([]);
        })
      );
  }

}
