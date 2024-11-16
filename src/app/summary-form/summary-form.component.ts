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
  readonly TAX_RATE = 7;
  @Input()
  newItem!: ProductItem;

  items: Array<ProductItems> = [];
  hasSimilarItem!: ProductItem | undefined;

  subtotal: number = 0;
  tax: number = 0;
  total: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['newItem'] && changes['newItem'].currentValue) {
      this.addItems();
      this.calculateSubtotal();
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
    this.calculateSubtotal();
  }

  calculateSubtotal() {
    this.subtotal = this.items.reduce(
      (sum, item) => sum + item.price * item.num,
      0
    );

    this.tax = this.calculateTax(this.subtotal);
    this.total = this.tax + this.subtotal;
  }

  calculateTax(subtotal: number): number {
    return (this.TAX_RATE / 100) * this.subtotal;
  }
}
