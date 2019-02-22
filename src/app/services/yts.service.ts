import { Injectable } from '@angular/core';
import { Observable, interval } from 'rxjs';
import {  HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import { MoviesInt } from './interface';
import { catchError, retry, retryWhen, debounceTime, delay, throttle } from 'rxjs/operators';

import { map, filter } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';


@Injectable({
  providedIn: 'root'
})
export class YtsService {

   /// movie
   yts_url = 'https://yts.am/api/v2/';
   FANART_URL = 'http://webservice.fanart.tv/v3';
   Api_Key = '9835c7b65e0db4c3c367c14c9b596483';
   constructor(  private http: Http  , private httpClient: HttpClient ) { }
 
 
 
     /**
      *  TODOs
      *  In the next version :
      *  0timize api loading speed in movies;
      */
 
 
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
 
 
 /******** ******************/
   // ** String (title, year, rating, peers, seeds, download_count, like_count, date_added) */
 
    getMoviesList(pageNumber, pageSize): Observable<MoviesInt[]> {
      const url =  `${this.yts_url}list_movies.json?limit=${pageSize}&page=${pageNumber}`;
       return  this.httpClient.get<MoviesInt[]>(url)
       .pipe(
         map( 
           res => res['data']
         ),
         retry(2), // retry a failed request up to 3 times
         catchError(this.handleError) // then handle the error
       );
   }
 
 
   /** GET DETAILS OF A MOVIE  */
   getMovieDetails(id): Observable<MoviesInt> {
      const url = `${this.yts_url}movie_details.json?movie_id=${id}&with_images=true&with_cast=true`;
     return  this.httpClient.get<any>(url)
     .pipe(
      map( 
        res => res['data']
      ),
       retry(2), // retry a failed request up to 3 times
       catchError(this.handleError) // then handle the error
     );
 
     }
   getSimilarMovies(id): Observable<MoviesInt[]> {
      const url = `${this.yts_url}movie_suggestions.json?movie_id=${id}`;
     return  this.httpClient.get<MoviesInt[]>(url)
     .pipe(
       retry(2), // retry a failed request up to 3 times
       catchError(this.handleError) // then handle the error
     );
 
     }
 
   getMoviesByKeyword(keyword): Observable<MoviesInt[]> {
      const url = `${this.yts_url}list_movies.json?query_term=${keyword}&sort_by=download_count&limit=50`;
     return  this.httpClient.get<MoviesInt[]>(url)
     .pipe(
       catchError(this.handleError), // then handle the error
        retry(2) // retry a failed request up to 3 times
     );
     }
 
   getImages(id:string, type:string){
    const url = `${this.FANART_URL}/${type}/${id}?api_key=${this.Api_Key}`;
     return  this.httpClient.get(url)
      .pipe(
        catchError(this.handleError), // then handle the error
          retry(2) // retry a failed request up to 3 times
      );
     }
 
 
}
