import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {


  constructor(private router: Router) { }

  ngOnInit() {
    this.initDynamicTitle();
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

  photo() {
    this.router.navigate(['photo']);
  }

  video() {
    this.router.navigate(['video']);
  }

  contactForm() {
    this.router.navigate(['contact-form']);
  }

  aboutUs() {
    this.router.navigate(['about-us']);
  }

  aboutIbd() {
    this.router.navigate(['about-ibd']);
  }

  home() {
    this.router.navigate(['home']);
  }

  aiHelp() {
    this.router.navigate(['ai-help']);
  }

  resources() {
    this.router.navigate(['resources']);
  }

  private initDynamicTitle() {
    const words = ["Early Diagnosis","Appoitment", "Early Diagnosis","Appoitment" ];
    let currentIndex = 0;
    const titleElement = document.getElementById('dynamic-title');

    if (titleElement) {
      function changeWord() {
        if (titleElement) {
          // Remove the current word with slideOut animation
          titleElement.classList.add('slide-out');

          setTimeout(() => {
            titleElement.classList.remove('slide-out');
            titleElement.textContent = words[currentIndex];
            titleElement.classList.add('slide-in');

            currentIndex = (currentIndex + 1) % words.length;
          }, 5000); // Time to match the slideOut duration
        }
      }

      setInterval(changeWord, 5000); // Change word every 2 seconds

      // Initial word change to start the process
      changeWord();
    }
  }
}
