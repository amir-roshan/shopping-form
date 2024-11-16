import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  newItem!: ProductItems;

  @Input()
  address!: string;

  @Input()
  firstName!: string;

  @Input()
  lastName!: string;

  items: Array<ProductItems> = [];
  hasSimilarItem!: ProductItems | undefined;

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
      existingItem.num += this.newItem.num;
    } else {
      this.items.push({ ...this.newItem });
    }

    console.log(this.items);
  }

  removeItem(item: ProductItems) {
    const index = this.items.findIndex((i) => i.item === item.item);
    this.items.splice(index, 1);

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
