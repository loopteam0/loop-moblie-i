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
export class SearchService {
 
  /// show
  eztv_url = 'https://eztv.ag/api/get-torrents?imdb_id=';
  base_url = 'https://tv-v2.api-fetch.website';


  loading;


  constructor(  private http: Http  , private httpClient: HttpClient) { }



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

 /** GET ANIMATIONS */
getAnimesList(animePage): Observable<MoviesInt> {
  const url = `${this.base_url}/animes/${animePage}?sort=trending&order=-1&genre=all`;
  return  this.http.get(url)
  .pipe(
    map(res => res.json()),
    // retry(3), // retry a failed request up to 3 times
    catchError(this.handleError) // then handle the error
  );

  }

  getAnimeDetails(imdb_id): Observable<MoviesInt[]> {
    const url = `${this.base_url}/anime/${imdb_id}`;
    return  this.http.get(url)
    .pipe(
       map(res => res.json()),
       retry(2), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );

  }

  getAnimesByKeyword(keyword): Observable< MoviesInt[] > {
    const url = `${this.base_url}/animes/1?sort=year&order=-1&genre=all&keywords=${keyword}`;
    return  this.http.get(url)
    .pipe(
      map(res => res.json()),
      retry(2), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );

    }

  getQuotes(): Observable<MoviesInt> {
    const url = `http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1`;
    return this.http.get(url).pipe(
        throttle(() => interval(500)),
      debounceTime(500),
      map(res => res.json()),
      retry(10)
    );
  }






}
