import { Component } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent {

  carouselOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    dots: false,
    nav: false,
    items: 3,
  };

  carouselImages = [
    'https://dosg.net/wp-content/uploads/2018/03/cafeteria.jpg',
    'https://lacafeteriatalca.cl/wp-content/uploads/2020/08/carrusel1.jpg',
    'https://dosg.net/wp-content/uploads/2018/03/cafeteria.jpg',
  ];



}
