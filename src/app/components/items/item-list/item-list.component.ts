import { Component, Input, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item.model';
import { ItemsApiService } from 'src/app/services/itemsapi.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {

  l_items: Item[] = [];
  total: number = this.l_items.length;
  p: number = 1;
  @Input() category: string = "";

  constructor(
    private service: ItemsApiService) { }


  ngOnInit(): void {
    this.service.getAll().subscribe({
      next: (items) => {
        this.l_items = items.filter(
          (item: { category: string; }) => item.category===this.category
          ),
          //console.log(items)
        this.total = this.l_items.length;
      },
      error: (console.log),
      complete: (console.log)
    })
  }

}
