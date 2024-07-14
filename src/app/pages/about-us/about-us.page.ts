import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.page.html',
  styleUrls: ['./about-us.page.scss'],
})
export class AboutUsPage implements OnInit {
  donationButtonVisible = false;

  constructor() { }

  ngOnInit() {
    // Optionally, initialize anything here
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const scrollPosition = window.scrollY;
    console.log(`Scroll Position: ${scrollPosition}`); // Debugging
    this.donationButtonVisible = scrollPosition > 200;
  }
}
