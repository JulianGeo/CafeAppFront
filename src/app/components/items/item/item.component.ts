import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from 'src/app/models/item.model';
import { Order } from 'src/app/models/order.model';
import { UserService } from 'src/app/services/user.service';

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

  constructor(
    private userService: UserService,
    private router: Router
    ) {}

  // a ts map cannot be directly stored in the local storage, a string conversion is required
  addToCart() {
    let items: any[] = JSON.parse(localStorage.getItem('items') || '[]');

    if (!this.userService.getState()){
      this.router.navigate(['/auth']);
    }

    if (!(items?.filter(i => i.name === this.item.name).length>0)){
      items?.push(this.item);
      localStorage.setItem('items', JSON.stringify(items));
    }

  }

}
