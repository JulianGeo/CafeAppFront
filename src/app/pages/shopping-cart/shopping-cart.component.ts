import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item.model';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {


  items: Item[] = [];
  total = 0;

  ngOnInit(): void {
    this.items = JSON.parse(localStorage.getItem('items') || "[]");
    const storedItems = localStorage.getItem('items');
    if (storedItems) {
      this.items = JSON.parse(storedItems);
      this.calculateTotal();
    }
  }


  removeFromCart(item: Item): void {
    var index: number =this.items.indexOf(item);
    this.items.splice(index, 1);
    localStorage.setItem('items', JSON.stringify(this.items));
    this.calculateTotal();
  }

  clearCart(): void {
    this.items = [];
    localStorage.removeItem('items');
    this.calculateTotal();
  }

  calculateTotal(): void {
    this.total = 0;
    if (this.items){
    this.items.forEach(item => {
      this.total += item.price;
    });
  }
  }
}
