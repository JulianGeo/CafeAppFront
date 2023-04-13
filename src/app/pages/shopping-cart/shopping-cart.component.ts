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
  total: number = 0;
  orderStatus: string = 'ongoing';
  order: Order | undefined = JSON.parse(localStorage.getItem('order') || "[]");



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
    localStorage.setItem('items', JSON.stringify([]));
    this.items = JSON.parse(localStorage.getItem('items') || "[]");
    this.uniqueItems = this.items.filter((item, i, arr) => arr.findIndex(itm => itm.name === item.name) === i);
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
    this.total = 0;

    if (this.items) {
      this.items.forEach(item => {
        this.subtotal += item.price;
      });
    }
    this.total = this.subtotal + this.deliveryCost;

    this.restartOrderStatus();
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
      title: 'Order placing',
      text: "Please make sure you ordered all the items you need",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, place it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Confirmed!',
          'Your order has been placed.',
          'success'
        )
        this.orderApiService.post(this.intializeOder()).subscribe((answer) => {
          console.log(answer);
          localStorage.setItem('order', JSON.stringify(answer));
        });
        this.orderStatus = "pending payment";
      }
    })
    //console.log('order placed');
  }

  checkOrderStatusForPlacing(): boolean {
    ;
    if (!this.order
      || this.checkItemsContent()
      || this.orderStatus !== "ongoing") {
      return true;
    }
    return false;
  }

  checkOrderStatusForPaying(): boolean {
    if (this.orderStatus === "paid" || this.orderStatus === "ongoing") {
      return true;
    }
    return false;
  }

  checkOrderStatusForCanceling(): boolean {
    if (this.orderStatus === "paid"
    || this.orderStatus === "pending payment"
    || this.orderStatus === "canelled") {
      return true;
    }
    return false;
  }

  checkItemsContent(): boolean {
    if (this.uniqueItems.length > 0) {
      return false;
    }
    return true;
  }

  restartOrderStatus(): void {
    this.orderStatus = "ongoing";
  }

  payOrder(): void {
    this.order=JSON.parse(localStorage.getItem('order') || "[]");
    if (this.order?.id) {
      this.orderApiService.pay(this.order.id, this.order)
        .subscribe(data => {
          this.orderStatus = "paid";
          Swal.fire(`The order with ID: ${data.id} has been paid`)
            .then(() => { this.clearCart(); })

        })
    }
  }

  cancelOrder(): void {
    if (this.order?.id)
      this.orderApiService.cancel(this.order.id, this.order)
        .subscribe(data => {
          this.orderStatus = "ongoing";
          localStorage.removeItem('order')
          Swal.fire(`The order with ID: ${data.id} has been cancelled`)
            .then(() => { this.clearCart(); })
        })
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
