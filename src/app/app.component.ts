import { Component } from '@angular/core';
import { MovieService } from './services/movie.service';
import { Movie } from './models/movie';
import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NicCageNovemberator';
  apiKey = null;
  movies = [];
  currentYear = new Date().getFullYear();

  constructor(private movieService: MovieService) { }

  onApiKeyEntered(apiKey: string) {
    this.apiKey = apiKey;
  }

  getMovies() {
    if (!this.apiKey) {
      // TODO: make this show up on the page
      console.error('No API key supplied!');
      return;
    }

    this.movieService.getMovies(this.apiKey).subscribe((movies: Movie[]) => {
      this.movies = _.shuffle(movies).slice(0, 31);
    });
  }
}
