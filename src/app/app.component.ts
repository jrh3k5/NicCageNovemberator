import { Component } from '@angular/core';
import { MovieService } from './movie.service';
import { Movie } from './movie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NicCageNovemberator';
  apiKey = null;

  constructor(private movieService: MovieService) { }

  onApiKeyEntered(apiKey: string) {
  	this.apiKey = apiKey;
  }

  getMovies() {
  	if(!this.apiKey) {
  		// TODO: make this show up on the page
  		console.error("No API key supplied!");
  		return;
  	}

  	this.movieService.getMovies(this.apiKey).subscribe((movies: Movie[]) => console.log(movies));
  }
}
