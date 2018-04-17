import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {MessageService} from '../common/message.service';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {Car} from './car';


@Injectable()
export class CarsService {
  private carsUrl = 'jboss-api/item';

  constructor(private messageService: MessageService, private http: HttpClient) {
  }

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.carsUrl)
      .pipe(
        catchError(error => {
          this.messageService.error(`getCars() ${error.message}`);
          return of([]);
        })
      );
  }

}
