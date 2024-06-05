import { Router} from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  events: { title: string; date: string }[] = [];
  hasFooter: boolean = true; // Adicione esta linha

  constructor(private router: Router) { }

  ngOnInit() {
    // Initial load of events, replace with your logic
    this.events = [
      { title: 'Event 1', date: '2024-06-01' },
      { title: 'Event 2', date: '2024-06-05' }
    ];
  }

  allrecords(){
    this.router.navigate(['records']);
  }
  signup(){
    this.router.navigate(['register']);
  }
  login(){
    this.router.navigate(['login']);
  }

  onDateChange(event: any) {
    const selectedDate = event.detail.value;
    console.log('Selected date: ', selectedDate);
    // Fetch and display events for the selected date
    // Replace with your logic to fetch events
    this.events = this.getEventsForDate(selectedDate);
  }

  getEventsForDate(date: string): { title: string; date: string }[] {
    // Replace with your actual event fetching logic
    return [
      { title: `Event on ${date}`, date }
    ];
  }
}
