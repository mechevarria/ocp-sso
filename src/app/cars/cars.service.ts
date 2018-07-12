import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {MessageService} from '../common/message.service';
import {Observable, of} from 'rxjs';
import {Car} from './car';


@Injectable({
  providedIn: 'root'
})
export class CarsService {
  private carsUrl = 'jboss-api/item';

  constructor(private messageService: MessageService, private http: HttpClient) {
  }

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.carsUrl)
      .pipe(
        catchError(error => {
          this.messageService.error(`getCars() ${error.message}`);
          return of(null);
        })
      );
  }

  saveCar(newCar: Car): Observable<Car> {
    return this.http.post<Car>(this.carsUrl, newCar)
      .pipe(
        catchError(error => {
          this.messageService.error(`saveCar() ${error.message}`);
          return of(null);
        })
      );
  }

  updateCar(newCar: Car): Observable<Car> {
    return this.http.put<Car>(this.carsUrl, newCar)
      .pipe(
        catchError(error => {
          this.messageService.error(`updateCar() ${error.message}`);
          return of(null);
        })
      );
  }

  deleteCar(id: number): Observable<any> {
    return this.http.delete<any>(`${this.carsUrl}/${id}`)
      .pipe(
        catchError(error => {
          this.messageService.error(`deleteCar() ${error.message}`);
          return of(null);
        })
      );
  }

}
