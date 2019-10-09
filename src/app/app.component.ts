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
  readonly vampiresKissMovieId = 7091;

  title = 'NicCageNovemberator';
  apiKey = null;
  movies = [];
  currentYear = new Date().getFullYear();
  bunnyMode = false;
  popularMode = true;
  vampiyahMode = false;

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

    this.movieService.getMovies(this.apiKey, this.isBunnyMode.bind(this), this.isPopularMode.bind(this)).subscribe((movies: Movie[]) => {
      this.movies = _.shuffle(movies).slice(0, 31);
      if (this.vampiyahMode && !this.movies.some(m => m.id === this.vampiresKissMovieId)) {
        const randomIndex = Math.floor(Math.random() * 31) + 1;
        const vampiresKissMovie = movies.find(m => m.id === this.vampiresKissMovieId);
        this.movies[randomIndex] = vampiresKissMovie;
      }
      // Just pad out the movies if needed
      while (this.movies.length < 31) {
        this.movies.push(this.movies[0]);
      }
    });
  }

  isBunnyMode() {
    return this.bunnyMode;
  }

  isPopularMode() {
    return this.popularMode;
  }

  isVampiyahMode() {
    return this.vampiyahMode;
  }

  toggleBunnyMode() {
    this.bunnyMode = !this.bunnyMode;
    if (this.bunnyMode) {
      this.vampiyahMode = false;
    }
  }

  toggleVampiyahMode() {
    this.vampiyahMode = !this.vampiyahMode;
    if (this.vampiyahMode) {
      this.bunnyMode = false;
    }
  }
}
