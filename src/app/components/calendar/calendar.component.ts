import { Component, OnInit } from '@angular/core';
import { MovieCalendarItem } from '../../models/movieCalendarItem';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const currentYear = new Date().getFullYear();
    const firstDayOfMonth = new Date(currentYear, 10, 1).getDay();

    this.weeks = [];

    const firstWeek = [];
    for(let i = 0; i < firstDayOfMonth && firstWeek.length < 7; i++) {
      firstWeek.push(new MovieCalendarItem(new Date(currentYear, 9, 31 - firstDayOfMonth + i + 1), null));
    }

    let novemberDayCount = 0;
    for(let i = firstDayOfMonth; i < 7 && firstWeek.length < 7; i++) {
      novemberDayCount++;
      firstWeek.push(new MovieCalendarItem(new Date(currentYear, 10, novemberDayCount), null));
    }
    this.weeks.push(firstWeek);

    let currentWeek = [];
    while(novemberDayCount < 30) {
      novemberDayCount++;
      currentWeek.push(new MovieCalendarItem(new Date(currentYear, 10, novemberDayCount), null));
      if(currentWeek.length === 7) {
        this.weeks.push(currentWeek);
        currentWeek = [];
      }
    }

    // If the last week is not a full week, fill it with days in December
    if(currentWeek.length < 7 && currentWeek.length !== 0) {
      let remainderCount = 0;
      while(currentWeek.length < 7) {
        currentWeek.push(new MovieCalendarItem(new Date(currentYear, 11, remainderCount), null));
        remainderCount++;
      }
      this.weeks.push(currentWeek);
    }

    console.log(this.weeks);
  }

}
