import { Component, Input } from '@angular/core';
import { Item } from 'src/app/models/item.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {

  private items: any[]|undefined|null;

  @Input() item: Item = {
    name: '',
    description: '',
    imageUrl: '',
    price: 0,
  }

  addToCart() {
    let items: any[] = JSON.parse(localStorage.getItem('items') || '[]');
    items?.push(this.item);
    localStorage.setItem('items', JSON.stringify(items));
    console.log('item added to cart');
  }

}
