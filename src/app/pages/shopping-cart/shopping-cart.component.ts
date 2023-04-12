import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/models/item.model';
import { Order } from 'src/app/models/order.model';
import { OrdersApiService } from 'src/app/services/ordersapi.service';
import { UsersApiService } from 'src/app/services/usersapi.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {




  items: Item[] = [];
  total = 0;


  constructor(
    private orderApiService: OrdersApiService,
    private router: Router
  ){}


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

  increaseQuantity(item: Item): void {
    let itemsQuantity = JSON.parse(localStorage.getItem('itemsQuantity') || '[]') as [string, number][];
    let itemsQuantity2 = new Map<string, number>(itemsQuantity);

    if (itemsQuantity2.get(item.name)) {

    // Get the current quantity of the item or default to 0
    let currentQuantity = itemsQuantity2.get(item.name);
    //let currentQuantity = itemsQuantity2?.(item.name) ?? 0;

    if (currentQuantity){
      // Increase the quantity by 1
      let newQuantity = currentQuantity + 1;

      // Update the quantity in the map
      itemsQuantity2.set(item.name, newQuantity);

      //save in local storage
      localStorage.setItem('itemsQuantity', JSON.stringify(Array.from(itemsQuantity2,  map => [...map])));
    }
  }

  }

  decreaseQuantity(item: Item): void {
    let itemsQuantity = JSON.parse(localStorage.getItem('itemsQuantity') || '[]') as [string, number][];
    let itemsQuantity2 = new Map<string, number>(itemsQuantity);

    if (itemsQuantity2.get(item.name)) {

    // Get the current quantity of the item or default to 0
    let currentQuantity = itemsQuantity2.get(item.name);
    //let currentQuantity = itemsQuantity2?.(item.name) ?? 0;

    if (currentQuantity && currentQuantity>0){
      // Increase the quantity by 1
      let newQuantity = currentQuantity - 1;

      // Update the quantity in the map
      itemsQuantity2.set(item.name, newQuantity);

      //save in local storage
      localStorage.setItem('itemsQuantity', JSON.stringify(Array.from(itemsQuantity2,  map => [...map])));
    }
  }

  }

  calculateTotal(): void {
    this.total = 0;
    if (this.items){
    this.items.forEach(item => {
      this.total += item.price;
    });
  }
  }


  placeOrder(): void {
    console.log(this.intializeOder());
    this.orderApiService.post(this.intializeOder()).subscribe((answer) =>{
      console.log(answer);
      //this.router.navigate(['/login']);
    });
    console.log('order placed');

  }

  intializeOder(): Order {

    let itemsQuantity1 = JSON.parse(localStorage.getItem('itemsQuantity') || '[]') as [string, number][];
    let itemsQuantity2 = new Map<string, number>(itemsQuantity1);

    let newOrder :Order = {
      user:  JSON.parse(localStorage.getItem('user') || "[]"),
      items:  JSON.parse(localStorage.getItem('items') || "[]"),
      itemsQuantity: itemsQuantity2,
      status: "pending",
      shipping: 15

    };

    return newOrder;


  }
}
