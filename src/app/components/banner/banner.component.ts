import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit{

  slides: any[] = new Array(3).fill({id: -1, src: '', title: '', subtitle: ''});

  constructor() {}

  ngOnInit(): void {
    this.slides[0] = {
      src: '../../../assets/Coffe1.png',
    };
    this.slides[1] = {
      src: '../../../assets/Coffe2.png',
    }
    this.slides[2] = {
      src: '../../../assets/Coffe3.png',
    }
  }

   onItemChange($event: any): void {
    console.log('Carousel onItemChange', $event);
  }


}
