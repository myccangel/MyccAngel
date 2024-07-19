import { Router } from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SwiperOptions } from 'swiper/types/swiper-options';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {
  events: { title: string; date: string }[] = [];
  hasFooter: boolean = true; // Added line

  constructor(private router: Router) { }

  option: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 10,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: true,
  };

  ngOnInit() {
    // Initialization code can go here
  }

  ngAfterViewInit() {
    // DOM Manipulation or Event Listeners should be in ngAfterViewInit
    const donationButton = document.querySelector('.donation-button');

    if (donationButton) {
      window.addEventListener('scroll', function () {
        if (window.scrollY > 100) { // Show button after scrolling 100px
          donationButton.classList.add('show');
        } else {
          donationButton.classList.remove('show');
        }
      });

      donationButton.addEventListener('click', function () {
        // Add your donation button click logic here
        alert('Donation button clicked!');
      });
    }
  }

  allrecords() {
    this.router.navigate(['records']);
  }

  signup() {
    this.router.navigate(['register']);
  }

  login() {
    this.router.navigate(['login']);
  }
  donation() {
    this.router.navigate(['donation']);
  }
  // Add this method to handle category changes
  changeCategory(event: Event, category: string) {
    event.preventDefault(); // Prevent default button click behavior
    console.log(`Category changed to: ${category}`);
    // You can implement additional logic here, such as navigating to another page or updating the view
  }
}
