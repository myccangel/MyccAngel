import { Router} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper/types/swiper-options';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  events: { title: string; date: string }[] = [];
  hasFooter: boolean = true; // Adicione esta linha

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



  changeCategory(event: any, category: string) {
    const buttons = document.querySelectorAll('.category-button');
    buttons.forEach(button => button.classList.remove('active'));
    event.target.classList.add('active');
    // Fetch and display data for the selected category
    console.log('Selected category: ', category);
  }

}
