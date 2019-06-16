import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'NicCageNovemberator';
  apiKey = null;

  onApiKeyEntered(apiKey: string) {
  	this.apiKey = apiKey;
  }

  getMovies() {
  	if(!this.apiKey) {
  		// TODO: make this show up on the page
  		console.error("No API key supplied!");
  	}
  }
}
