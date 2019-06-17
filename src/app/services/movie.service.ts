import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Movie } from '../models/movie';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MovieCreditsResponse } from '../models/movieCreditsResponse';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  constructor(private httpClient: HttpClient) { }

  getMovies(apiKey: string): Observable<Movie[]> {
    const params = new HttpParams().set('language', 'en-US')
                                   .set('api_key', apiKey);
    const options = {
      params: params
    };

    const ignoreList = [
      279144, // The Death of "Superman Lives": What Happened
      144708, // John Travolta: The Inside Story
    ];

    return this.httpClient.get<MovieCreditsResponse>('https://api.themoviedb.org/3/person/2963/movie_credits', options)
                          .pipe(map(results => results.cast.filter(c => !ignoreList.some(il => il === c.id))));
  }
}
