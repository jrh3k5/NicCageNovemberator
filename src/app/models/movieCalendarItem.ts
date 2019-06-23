import { Movie } from './movie';

export class MovieCalendarItem {
  date = null;
  movie = null;

  constructor(date: Date, movie: Movie) {
    this.date = date;
    this.movie = movie;
  }
}
