import { Component, Input } from '@angular/core';
import { Item } from 'src/app/models/item.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {

  @Input() item: Item = {
    name: '',
    description: '',
    imageUrl: '',
    price: 0,
  }

}
