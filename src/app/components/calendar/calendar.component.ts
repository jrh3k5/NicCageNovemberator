import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MovieCalendarItem } from '../../models/movieCalendarItem';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnChanges {
  @Input() movies: Movie[];

  weeks: MovieCalendarItem[][];

  constructor() {
    // Initialize calendar data in constructor, rathan than OnInit because OnChanges fires before OnInit
    const currentYear = new Date().getFullYear();
    const firstDayOfMonth = new Date(currentYear, 10, 1).getDay();

    this.weeks = [];

    const firstWeek: MovieCalendarItem[] = [];
    for (let i = 0; i < firstDayOfMonth && firstWeek.length < 7; i++) {
      firstWeek.push(new MovieCalendarItem(new Date(currentYear, 9, 31 - firstDayOfMonth + i + 1), null));
    }

    let novemberDayCount = 0;
    for (let i = firstDayOfMonth; i < 7 && firstWeek.length < 7; i++) {
      novemberDayCount++;
      firstWeek.push(new MovieCalendarItem(new Date(currentYear, 10, novemberDayCount), null));
    }
    this.weeks.push(firstWeek);

    let currentWeek: MovieCalendarItem[] = [];
    while (novemberDayCount < 30) {
      novemberDayCount++;
      currentWeek.push(new MovieCalendarItem(new Date(currentYear, 10, novemberDayCount), null));
      if (currentWeek.length === 7) {
        this.weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    // If the last week is not a full week, fill it with days in December
    if (currentWeek.length < 7 && currentWeek.length !== 0) {
      let remainderCount = 1;
      while (currentWeek.length < 7) {
        currentWeek.push(new MovieCalendarItem(new Date(currentYear, 11, remainderCount), null));
        remainderCount++;
      }
      this.weeks.push(currentWeek);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.movies && this.weeks) {
      const movies = changes.movies.currentValue;
      this.weeks.forEach(week => {
        week.filter(day => day.date.getMonth() === 10)
            .forEach(day => {
              if (!movies) {
                day.movie = null;
              } else {
                const movieIndex = day.date.getDate() - 1;
                day.movie = movies[movieIndex];
              }
        });
      });
    }
  }
}
