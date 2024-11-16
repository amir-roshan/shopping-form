import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ProductItem {
  item: string;
  price: number;
}

interface ProductItems {
  item: string;
  price: number;
  num: number;
}

@Component({
  selector: 'app-summary-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summary-form.component.html',
  styleUrl: './summary-form.component.css',
})
export class SummaryFormComponent implements OnChanges {
  @Input()
  newItem!: ProductItem;

  items: Array<ProductItems> = [];
  hasSimilarItem!: ProductItem | undefined;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['newItem'] && changes['newItem'].currentValue) {
      this.addItems();
    }
  }
  addItems() {
    const existingItem = this.items.find(
      (item) => item.item === this.newItem.item
    );

    if (existingItem) {
      existingItem.num++;
    } else {
      this.items.push({ ...this.newItem, num: 1 });
    }

    console.log(this.items);
  }

  removeItem(item: ProductItems) {
    item.num--;
    if (item.num === 0) {
      this.items = this.items.filter((item) => item.item !== item.item);
    }
  }
}
