import { Component, Input } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { Order } from 'src/app/models/order.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {

  private items: Set<any>|undefined|null;

  @Input() item: Item = {
    name: '',
    description: '',
    imageUrl: '',
    price: 0,
  }

  // a ts map cannot be directly stored in the local storage, a string conversion is required
  addToCart() {
    let items: any[] = JSON.parse(localStorage.getItem('items') || '[]');
    let itemsQuantity = JSON.parse(localStorage.getItem('itemsQuantity') || '[]') as [string, number][];
    let itemsQuantity2 = new Map<string, number>(itemsQuantity);

    if (!(items?.filter(i => i.name === this.item.name).length>0)){
      //console.log("this is the list of maps")
      //console.log(itemsQuantity);
      items?.push(this.item);
      itemsQuantity2?.set(this.item.name,1);
      //console.log("itemQuantity2");
      //console.log(itemsQuantity2);
      localStorage.setItem('items', JSON.stringify(items));
      localStorage.setItem('itemsQuantity', JSON.stringify(Array.from(itemsQuantity2,  map => [...map])));
    }

/*    if(order.items && order.itemsQuantity){
      if (!(order?.items.filter(i => i.name === this.item.name).length>0)){
        let itemsQuantitymap = new Map<string, number>(Object.entries(order.itemsQuantity || {}));


        items?.push(this.item);
        itemsQuantitymap.set(this.item.name, 1);
        console.log(order.itemsQuantity);
        order.itemsQuantity = itemsQuantitymap;
        order.total=10;
        //order.itemsQuantity?.set(this.item.name, 1);
        console.log("order to be saved")
        console.log(order);
        localStorage.setItem('order1', JSON.stringify(order));
        console.log('item added to cart');
      }
   } */

  }

}
