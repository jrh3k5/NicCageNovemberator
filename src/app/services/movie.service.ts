import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../models/movie';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private httpClient: HttpClient) { }

  getMovies(apiKey: string): Observable<Movie[]> {
    return this.httpClient.get('https://api.themoviedb.org/3/person/2963/movie_credits', {
      params: {
        language: 'en-US',
        api_key: apiKey
      }
    }).pipe(map(results => results['cast'].map(c => new Movie(c.title))))
  }
}
