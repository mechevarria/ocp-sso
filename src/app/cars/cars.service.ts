import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
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
        catchError(res => {
          return this.handleError(res);
        })
      );
  }

  saveCar(newCar: Car): Observable<Car> {
    return this.http.post<Car>(this.carsUrl, newCar)
      .pipe(
        catchError(res => {
          return this.handleError(res);
        })
      );
  }

  updateCar(newCar: Car): Observable<Car> {
    return this.http.put<Car>(this.carsUrl, newCar)
      .pipe(
        catchError(res => {
          return this.handleError(res);
        })
      );
  }

  deleteCar(id: number): Observable<any> {
    return this.http.delete<any>(`${this.carsUrl}/${id}`)
      .pipe(
        catchError(res => {
          return this.handleError(res);
        })
      );
  }

  private handleError(res: HttpErrorResponse): Observable<any> {
    this.messageService.error(`updateCar() ${res.message}`);
    console.error(res.error);
    return of(null);
  }

}
