import { Injectable } from '@angular/core';
import { Observable, interval } from 'rxjs';
import {  HttpErrorResponse, HttpClient } from '@angular/common/http';
import { MoviesInt } from './interface';
import { catchError, retry, retryWhen, debounceTime, delay, throttle } from 'rxjs/operators';
import { map, filter } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PopcornService {


    /// show
    eztv_url = environment.EZTV_URL;
    base_url = environment.POPCORN_URL;
  
    constructor( private httpClient: HttpClient) { }
  
    /** error handling */
    public handleError(error: HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
          retryWhen( errors => errors.pipe(delay(500)));
        console.error('An error occurred:', error.error.message);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(`Backend returned code ${error.status}, body was: ${error.status}`);
      }
      // return an observable with a user-facing error message
      return throwError('Something bad happened, Check internet connection and retry.');
    }
  
  /* Possible values:  name , rating , released , trending , updated , year  */
  /*** GET TV SHOWS */
    getShowsList(showPage: number): Observable<MoviesInt[]> {
      const url = `${this.base_url}/shows/${showPage}?sort=trending&order=-1&genre=all`;
    return  this.httpClient.get<MoviesInt[]>(url)
    .pipe(
      retry(2), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  
    }
  
    getShowDetails(imdb_id: any): Observable<MoviesInt> {
      const url = `${this.base_url}/show/tt${imdb_id}`;
      return  this.httpClient.get<MoviesInt>(url)
      .pipe(
         retry(2), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  
    }
  
    getShowEpisopse(imdb_id: any , size: any, page: any): Observable<MoviesInt[]> {
        const url = `${this.eztv_url}${imdb_id}&limit=${size}&page=${page}`;
        return  this.httpClient.get<MoviesInt[]>(url)
        .pipe(
           retry(2), // retry a failed request up to 3 times
          catchError(this.handleError) // then handle the error
        );
  
    }
  
    getShowsByKeyword(keyword: any): Observable<MoviesInt[]> {
      const url = `${this.base_url}/shows/1?sort=year&order=-1&genre=all&keywords=${keyword}`;
      return  this.httpClient.get<MoviesInt[]>(url)
      .pipe(
        retry(2), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  
      }
  
      getMovieDetails(imdb_id: any): Observable<MoviesInt> {
        const url = `${this.base_url}/movie/tt${imdb_id}`;
        return  this.httpClient.get<MoviesInt>(url)
        .pipe(
           retry(2), // retry a failed request up to 3 times
          catchError(this.handleError) // then handle the error
        );
    
      }
}
