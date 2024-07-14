import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-photo',
  templateUrl: './photo.page.html',
  styleUrls: ['./photo.page.scss'],
})
export class PhotoPage implements OnInit {
  images: string[] = [
    'https://img.freepik.com/vetores-gratis/infografico-de-doenca-inflamatoria-intestinal-ibd_1308-129819.jpg',
    'https://img.freepik.com/vetores-gratis/infografico-de-doenca-inflamatoria-intestinal-ibd_1308-129819.jpg',
    'https://img.freepik.com/vetores-gratis/infografico-de-doenca-inflamatoria-intestinal-ibd_1308-129819.jpg',
    'https://img.freepik.com/vetores-gratis/infografico-de-doenca-inflamatoria-intestinal-ibd_1308-129819.jpg',
    'https://img.freepik.com/vetores-gratis/infografico-de-doenca-inflamatoria-intestinal-ibd_1308-129819.jpg',
    'https://img.freepik.com/vetores-gratis/infografico-de-doenca-inflamatoria-intestinal-ibd_1308-129819.jpg',
    'https://img.freepik.com/vetores-gratis/infografico-de-doenca-inflamatoria-intestinal-ibd_1308-129819.jpg',
    'https://img.freepik.com/vetores-gratis/infografico-de-doenca-inflamatoria-intestinal-ibd_1308-129819.jpg',
    'https://img.freepik.com/vetores-gratis/infografico-de-doenca-inflamatoria-intestinal-ibd_1308-129819.jpg',
    'https://img.freepik.com/vetores-gratis/infografico-de-doenca-inflamatoria-intestinal-ibd_1308-129819.jpg',
    'https://img.freepik.com/vetores-gratis/infografico-de-doenca-inflamatoria-intestinal-ibd_1308-129819.jpg',
    'https://img.freepik.com/vetores-gratis/infografico-de-doenca-inflamatoria-intestinal-ibd_1308-129819.jpg'
  ];

  currentIndex: number = 0;
  intervalId: any;

  get transform(): string {
    const slideWidth = 90; // Adjust as needed based on your design
    return `translateX(-${this.currentIndex * slideWidth}%)`;
  }

  constructor() {}

  ngOnInit() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 3000); // Change slide every 3 seconds
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.images.length - 1;
    }
  }

  nextSlide() {
    if (this.currentIndex < this.images.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0;
    }
  }

  changeSlide(index: number) {
    this.currentIndex = index;
    clearInterval(this.intervalId); // Stop auto sliding on manual selection
  }
}
