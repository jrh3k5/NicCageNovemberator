import { Movie } from './movie';

export class MovieCalendarItem {
  constructor(date: Date, movie: Movie) {
    this.date = date;
    this.movie = movie;
  }
}