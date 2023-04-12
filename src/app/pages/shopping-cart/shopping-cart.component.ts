import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/models/item.model';
import { Order } from 'src/app/models/order.model';
import { OrdersApiService } from 'src/app/services/ordersapi.service';
import { UsersApiService } from 'src/app/services/usersapi.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {



  //TODO: veirify the use this internal intems variable
  items: Item[] = [];
  uniqueItems: Item[] = this.items.filter((item, i, arr) => arr.findIndex(itm => itm.name === item.name) === i);
  itemsQuantity: Map<string, number> = new Map<string, number>();
  delivery: boolean = false;
  deliveryCost: number = 0;
  subtotal: number = 0;
  total: number= 0;



  constructor(
    private orderApiService: OrdersApiService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.items = JSON.parse(localStorage.getItem('items') || "[]");
    const storedItems = localStorage.getItem('items');
    if (storedItems) {
      this.items = JSON.parse(storedItems);
      this.calculateTotal();
    }

    //fill the itemsQuantity map
    this.items.map((item: Item) => {
      if (!this.itemsQuantity.get(item.name)) {
        let quantity: number = this.items?.filter((i: { name: string; }) => i.name === item.name).length;
        this.itemsQuantity.set(item.name, quantity);
      }
    });

    //set the unique items list
    this.uniqueItems = this.items.filter((item, i, arr) => arr.findIndex(itm => itm.name === item.name) === i);

  }


  removeFromCart(item: Item): void {

    this.items = this.items?.filter((i: { name: string; }) => i.name !== item.name);
    this.uniqueItems = this.items.filter((item, i, arr) => arr.findIndex(itm => itm.name === item.name) === i);
    //var index: number = this.items.indexOf(item);
    //this.items.splice(index, 1);
    localStorage.setItem('items', JSON.stringify(this.items));
    this.calculateTotal();
  }



  clearCart(): void {
    this.items = [];
    localStorage.removeItem('items');
    this.calculateTotal();
  }

  increaseQuantity(item: Item): void {
    let items = JSON.parse(localStorage.getItem('items') || '[]');

    items.push(item);
    //update the internal map of items name and quantity
    let filteredItems: any[] = items?.filter((i: { name: string; }) => i.name === item.name);
    this.itemsQuantity.set(item.name, filteredItems.length)
    //save in local storage
    localStorage.setItem('items', JSON.stringify(items));
    this.calculateTotal();
  }

  decreaseQuantity(item: Item): void {
    let items = JSON.parse(localStorage.getItem('items') || '[]');

    if ((items?.filter((i: { name: string; }) => i.name === item.name).length > 1)) {

      //update the internal map of items name and quantity
      let filteredItems: any[] = items?.filter((i: { name: string; }) => i.name === item.name);
      let unfilteredItems: any[] = items?.filter((i: { name: string; }) => i.name !== item.name);
      filteredItems.pop();
      let allItems: any[] = filteredItems.concat(unfilteredItems);
      this.itemsQuantity.set(item.name, filteredItems.length)

      //save in local storage
      localStorage.setItem('items', JSON.stringify(allItems));
      this.calculateTotal();

    }
  }

  getItemQuantity(item: Item): any {
    console.log(this.itemsQuantity)
    console.log(this.itemsQuantity.get(item.name));
    return this.itemsQuantity.get(item.name);
  }


  calculateTotal(): void {
    this.items = JSON.parse(localStorage.getItem('items') || "[]");
    this.subtotal = 0;
    this.total=0;

    if (this.items) {
      this.items.forEach(item => {
        this.subtotal += item.price;
      });
    }
    this.total = this.subtotal + this.deliveryCost;
  }


  enableDelivery(): void {
    this.delivery = !this.delivery;

    if (this.delivery) {
      this.deliveryCost = 10;
    } else {
      this.deliveryCost = 0;
    }

    this.calculateTotal();
  }


  placeOrder(): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will need to call the admin to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, place it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your order has been placed.',
          'success'
        )
        console.log(this.intializeOder());
        this.orderApiService.post(this.intializeOder()).subscribe((answer) => {
          console.log(answer);
        });
        localStorage.removeItem('items');
        window.location.reload();
      }
    })
    //console.log('order placed');
  }

  intializeOder(): Order {
    this.calculateTotal();
    let newOrder: Order = {
      user: JSON.parse(localStorage.getItem('user') || "[]"),
      items: JSON.parse(localStorage.getItem('items') || "[]"),
      status: "pending",
      shipping: this.deliveryCost,
      subtotal: this.subtotal,
      total: this.total
    };

    return newOrder;


  }
}
